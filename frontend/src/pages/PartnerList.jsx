import { Card, Center, Drawer, Grid, Image, Text, TextInput, Textarea } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import PartnerCard from '../components/Partner/PartnerCard';
import { usePartnerStore } from '../stores/partners';

export default function PartnerList() {
  const { kind } = useParams();

  // State variables
  const [partnerCompanies, partnerSchools, createPartner, fetchAllPartners, updatePartner, deletePartner] =
    usePartnerStore((state) => [
      state.partnerCompanies,
      state.partnerSchools,
      state.create,
      state.fetchAll,
      state.update,
      state.delete,
    ]);
  const [partners, setPartners] = useState([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [displayedPartner, setDisplayedPartner] = useState(null);

  const addPartnerNameTextInput = useRef(null);
  const addPartnerDescriptionTextInput = useRef(null);
  const addPartnerCategoryTextInput = useRef(null);
  const addPartnerLogoTextInput = useRef(null);

  // Fetch all companies on page load
  useEffect(() => {
    async function fetchData() {
      await fetchAllPartners(kind);
    }
    fetchData();
  }, [fetchAllPartners, kind]);

  useEffect(() => {
    if (kind === 'companies') {
      setPartners(partnerCompanies);
    } else if (kind === 'schools') {
      setPartners(partnerSchools);
    }
  }, [kind, partnerCompanies, partnerSchools]);

  useEffect(() => {
    if (!['companies', 'schools'].includes(kind)) {
      redirect('/partners/companies');
    }
  }, [kind]);

  // Event handlers
  const handlePartnerRemove = (id) => {
    const partner = partners.find((partner) => partner.id === id);
    modals.openConfirmModal({
      title: 'Supprimer le partneraire',
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer le partenaire <b>{partner.title}</b> ? Cette action est irréversible.
        </Text>
      ),
      labels: { confirm: 'Supprimer', cancel: 'Annuler' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await deletePartner(id);
      },
    });
  };

  const handleAddPartner = () => {
    modals.openConfirmModal({
      title: 'Ajouter un partenaire',
      children: (
        <>
          <TextInput ref={addPartnerNameTextInput} label="Nom du partenaire" data-autofocus required />
          <Textarea
            ref={addPartnerDescriptionTextInput}
            label="Description du partenaire"
            minRows={4}
            autosize
            required
          />
          <TextInput ref={addPartnerCategoryTextInput} label="Secteur d'activité" />
          <TextInput ref={addPartnerLogoTextInput} label="Lien du logo" />
        </>
      ),
      labels: { confirm: 'Ajouter', cancel: 'Annuler' },
      onConfirm: async () => {
        try {
          await createPartner({
            title: addPartnerNameTextInput.current.value,
            content: addPartnerDescriptionTextInput.current.value,
            category: addPartnerCategoryTextInput.current.value || undefined,
            imageUrl: addPartnerLogoTextInput.current.value || undefined,
            kind,
          });
          notifications.show({
            title: 'Partenaire ajouté',
            message: 'Le partenaire a été ajouté avec succès.',
            color: 'green',
          });
        } catch (error) {
          console.error(error);
          notifications.show({
            title: 'Erreur',
            message: "Une erreur est survenue lors de l'ajout du partenaire.",
            color: 'red',
          });
        }
      },
    });
  };

  const handleEditPartner = (id) => {
    const partner = partners.find((partner) => partner.id === id);
    modals.openConfirmModal({
      title: 'Modifier le partenaire',
      children: (
        <>
          <TextInput
            ref={addPartnerNameTextInput}
            label="Nom du partenaire"
            defaultValue={partner.title}
            data-autofocus
            required
          />
          <Textarea
            ref={addPartnerDescriptionTextInput}
            label="Description du partenaire"
            minRows={4}
            autosize
            maxRows={8}
            defaultValue={partner.content}
            required
          />
          <TextInput ref={addPartnerCategoryTextInput} label="Secteur d'activité" defaultValue={partner.category} />
          <TextInput ref={addPartnerLogoTextInput} label="Lien du logo" defaultValue={partner.imageUrl} />
        </>
      ),
      labels: { confirm: 'Modifier', cancel: 'Annuler' },
      onConfirm: async () => {
        try {
          await updatePartner(id, {
            title: addPartnerNameTextInput.current.value,
            content: addPartnerDescriptionTextInput.current.value,
            category: addPartnerCategoryTextInput.current.value || undefined,
            imageUrl: addPartnerLogoTextInput.current.value || undefined,
          });
          notifications.show({
            title: 'Partenaire modifié',
            message: 'Le partenaire a été modifié avec succès.',
            color: 'green',
          });
        } catch (error) {
          console.error(error);
          notifications.show({
            title: 'Erreur',
            message: 'Une erreur est survenue lors de la modification du partenaire.',
            color: 'red',
          });
        }
      },
    });
  };

  const handleSeeMore = (id) => {
    const partner = partners.find((partner) => partner.id === id);
    setDisplayedPartner(partner);
    open();
  };

  return (
    <>
      <h1>{kind === 'companies' ? 'Entreprises' : 'Écoles'} partenaires</h1>

      <Drawer opened={opened} onClose={close} title={displayedPartner?.title} size="xl" position="right">
        {displayedPartner?.imageUrl && <Image width={200} height={80} src={displayedPartner.imageUrl} />}

        <Text mt="sm">{displayedPartner?.content}</Text>
      </Drawer>

      {/* Render partner cards */}
      <Grid columns={3} mb="sm">
        {partners
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((partner) => (
            <Grid.Col span={1} key={partner.id}>
              <PartnerCard
                partner={partner}
                onSeeMore={() => handleSeeMore(partner.id)}
                onEdit={() => handleEditPartner(partner.id)}
                onRemove={() => handlePartnerRemove(partner.id)}
              />
            </Grid.Col>
          ))}

        <Grid.Col span={1}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            h="100%"
            bg="#eee"
            style={{ cursor: 'pointer' }}
            withBorder
            onClick={handleAddPartner}
          >
            <Center h="100%">
              <IconPlus size={200} color="#bbb" strokeWidth={1.2} />
            </Center>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
