import 'dotenv/config';
import type {
  Comment,
  Post,
  Transaction,
  User,
} from '@prisma/client';
import {
  PostKind,
  PrismaClient,
  TransactionMean,
  TransactionType,
} from '@prisma/client';
import bcrypt from 'bcrypt';
import {
  CommentPermissions,
  PermissionHelper,
  PostPermissions,
  TransactionPermissions,
  UserPermissions,
} from '../../src/utils/permissions';

const prisma = new PrismaClient();

const users = [
  {
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!,
    firstname: 'Admin',
    lastname: 'Securecorp',
    roles: {
      connect: [{ name: 'admin' }],
    },
  },
  {
    email: 'jane.doe@securecorp.fr',
    password: 'password',
    firstname: 'Jane',
    lastname: 'Doe',
    roles: {
      connect: [{ name: 'user' }],
    },
  },
  {
    email: 'john.smith@securecorp.fr',
    password: 'password',
    firstname: 'John',
    lastname: 'Smith',
    roles: {
      connect: [{ name: 'user' }],
    },
  },
  {
    email: 'tom.oliver@securecorp.fr',
    password: 'password',
    firstname: 'Tom',
    lastname: 'Oliver',
    roles: {
      connect: [{ name: 'user' }],
    },
  },
];

const transactions = [
  {
    otherCompany: 'Apple',
    amount: 1000,
    type: TransactionType.CREDIT,
    mean: TransactionMean.CHECK,
  },
  {
    otherCompany: 'Google',
    amount: 2000,
    type: TransactionType.DEBIT,
    mean: TransactionMean.TRANSFER,
  },
  {
    otherCompany: 'Microsoft',
    amount: 3000,
    type: TransactionType.CREDIT,
    mean: TransactionMean.CHECK,
  },
  {
    otherCompany: 'Amazon',
    amount: 4000,
    type: TransactionType.DEBIT,
    mean: TransactionMean.CASH,
  },
  {
    otherCompany: 'Facebook',
    amount: 5000,
    type: TransactionType.CREDIT,
    mean: TransactionMean.CARD,
  },
];

const posts = [
  {
    title: 'Apple Inc.',
    content: 'Magna occaecat nostrud quis qui. Aliqua officia sit et cupidatat elit labore consequat veniam nulla eiusmod ullamco. Aute anim labore cupidatat ea ut nisi non cillum Lorem aliqua esse enim sint cillum tempor. Ad veniam exercitation Lorem eu nisi non aliquip aliqua minim ea nisi. Id adipisicing nisi occaecat. Tempor dolore voluptate qui non quis incididunt non consequat nulla do veniam aute consectetur. Et dolor laboris fugiat dolor nostrud dolore cillum velit dolore culpa nisi dolor exercitation do.\nDuis enim nulla aute enim aute eiusmod nostrud Lorem elit do in. Id voluptate consectetur ad et pariatur culpa ad dolor labore nulla magna Lorem voluptate. Amet et veniam in enim ipsum duis do id esse dolore. Culpa amet dolor anim laboris.\nPariatur ut id Lorem dolore duis Lorem consequat laborum occaecat dolor duis. Nisi pariatur cillum enim dolor sit deserunt magna ipsum cupidatat et esse aliqua in. Consequat laborum laborum fugiat duis magna occaecat occaecat est sint fugiat quis cillum. Adipisicing id reprehenderit voluptate ut quis eiusmod deserunt. Lorem elit quis dolor minim sunt esse do. Eu ut occaecat anim incididunt. Veniam voluptate nisi pariatur nisi proident proident aliqua id enim dolore velit ea irure incididunt aute.\nUllamco elit excepteur irure proident occaecat aliqua irure nostrud laboris adipisicing nisi esse. Dolor amet laboris cillum nostrud pariatur eiusmod eiusmod adipisicing. Enim ad dolor ut aliquip qui ea amet sunt proident. Ullamco qui cillum sunt deserunt sint enim laboris tempor veniam esse sunt est sit incididunt cillum. Nostrud est in duis consectetur nostrud incididunt mollit irure do proident voluptate duis ut pariatur mollit. Proident pariatur duis voluptate consectetur minim pariatur cillum velit officia nostrud. Sit fugiat mollit et laboris exercitation amet exercitation fugiat laboris aliqua velit aliqua nostrud et id. Cillum deserunt veniam tempor consequat ullamco ullamco ex dolor consequat magna excepteur laboris.',
    kind: PostKind.PARTNER_COMPANY,
    category: 'Tech & IT',
    author: { connect: { email: users[2].email } },
  },
  {
    title: 'Google LLC',
    content: 'Dolor sit cillum exercitation ut sunt do esse mollit commodo minim deserunt qui minim. Laborum duis anim cupidatat voluptate adipisicing. Fugiat eu commodo reprehenderit laboris veniam cupidatat sunt eiusmod laboris consectetur. Pariatur fugiat irure magna velit.\nAmet eiusmod exercitation in occaecat ipsum deserunt sunt irure consectetur officia labore ut commodo ipsum. Occaecat ullamco do qui mollit dolor sit consectetur voluptate ullamco. Esse anim labore officia dolor nostrud sunt sint voluptate. Elit ullamco dolor excepteur est exercitation adipisicing esse tempor consectetur veniam veniam minim. Dolor esse mollit dolor cillum.\nExcepteur elit aliquip esse elit. Quis occaecat consectetur qui labore nostrud dolor consectetur dolore ipsum velit cupidatat nulla dolor. Velit minim do aute exercitation mollit irure non. Culpa elit culpa Lorem culpa ipsum et cupidatat. Nisi et Lorem consectetur pariatur aute et ullamco sunt excepteur. Magna eu quis quis labore dolor cillum id. Enim ad nostrud culpa do qui non adipisicing aliqua officia et eiusmod incididunt esse.\nId laboris aliqua ipsum reprehenderit dolore cillum esse veniam sit et velit consectetur eiusmod ea amet. Lorem excepteur consectetur ut in et enim aute nisi mollit tempor ullamco. Dolor commodo non aliqua tempor amet laborum voluptate duis ea mollit aute. Fugiat nostrud do sunt qui adipisicing ea enim culpa elit minim incididunt elit dolore. Aliqua cillum culpa aute reprehenderit occaecat et reprehenderit. Tempor est labore nostrud irure culpa non irure voluptate magna.',
    kind: PostKind.PARTNER_COMPANY,
    category: 'Tech & IT',
    author: { connect: { email: users[2].email } },
  },
  {
    title: 'Decathlon',
    content: 'Proident sunt cupidatat officia anim et non enim labore qui. Ea aute ex culpa id pariatur. Deserunt ut cupidatat ad amet sunt eu excepteur adipisicing eu non cillum fugiat quis amet ex. Exercitation nisi nostrud consequat nulla labore minim ullamco occaecat nostrud consequat exercitation. Ad eiusmod aliquip non veniam adipisicing pariatur Lorem aliquip dolor amet dolore ex ullamco incididunt. Voluptate exercitation amet nisi culpa id incididunt ut non non.\nEx irure in nostrud enim pariatur enim laborum consectetur adipisicing labore excepteur commodo ut esse ea. Cupidatat mollit velit laboris dolore. Ut laboris enim et deserunt ipsum cillum pariatur amet cupidatat consectetur officia. Consectetur mollit nulla consectetur in occaecat voluptate et amet. Exercitation amet fugiat Lorem ut sint proident quis.\nAnim duis ea officia quis do laboris sint labore exercitation consequat anim aute nulla tempor. Tempor incididunt aliquip proident aliqua veniam irure laboris dolor mollit. Proident id ullamco reprehenderit est laboris ullamco pariatur dolor irure et. Do ex voluptate adipisicing nostrud id id nostrud id. Nisi ullamco laborum qui irure minim sunt ex nostrud. Est exercitation sint id ullamco exercitation anim. Ad dolor ullamco eu culpa qui nostrud qui ipsum reprehenderit laborum velit.\nVoluptate eu veniam dolor ea minim. Exercitation ex incididunt sunt commodo laboris incididunt adipisicing duis et sit. Fugiat excepteur et id Lorem est. Ut ut nisi qui veniam eiusmod.',
    kind: PostKind.PARTNER_COMPANY,
    category: 'Sport & Fitness',
    author: { connect: { email: users[2].email } },
  },
  {
    title: 'Leroy Merlin',
    content: 'Ex reprehenderit eiusmod eiusmod anim tempor est aliqua enim nostrud dolore amet culpa et consequat. Sint et mollit tempor culpa sint amet enim exercitation eiusmod elit magna. Nulla pariatur excepteur nisi exercitation et Lorem exercitation voluptate amet dolore esse mollit sit proident dolor. Do est proident officia ad dolore. Pariatur dolore do cillum dolore minim sit consectetur sit consequat aliqua ad ex ipsum aliquip. Nulla deserunt mollit cillum consequat aliquip deserunt officia quis exercitation sint pariatur Lorem ex. Aliqua nisi mollit nostrud aliqua voluptate nisi consequat. Proident duis incididunt adipisicing laboris adipisicing anim tempor anim sit ea non.\nEa ea velit officia dolor adipisicing consequat officia officia amet exercitation Lorem aliqua consectetur velit sint. Ut laboris ex amet adipisicing elit dolore proident voluptate aute. Fugiat ut voluptate magna. Duis ut eu ea elit consectetur commodo irure. Pariatur laborum occaecat labore voluptate reprehenderit enim qui. Proident minim adipisicing ullamco.\nReprehenderit proident aute minim nostrud officia. Do et amet officia sit aliqua fugiat minim. Cupidatat consectetur laboris aute sunt non ad deserunt non ut proident veniam. Sunt nisi ipsum ex aliquip. Sint officia aute sunt commodo adipisicing nulla pariatur.\nMollit nostrud amet esse magna esse ipsum deserunt minim culpa mollit amet ullamco consectetur sunt id. Veniam voluptate magna et voluptate do sunt ullamco nulla. Aliquip occaecat non magna est dolore esse occaecat fugiat officia mollit sunt. Adipisicing culpa cillum qui reprehenderit quis in excepteur.',
    kind: PostKind.PARTNER_COMPANY,
    category: 'Home & Garden',
    author: { connect: { email: users[2].email } },
  },

  {
    title: 'Concordia University',
    content: 'Enim exercitation esse reprehenderit magna ad aliqua. Ea duis dolore Lorem eu proident. Cupidatat dolor nostrud veniam aliqua ex. Tempor aliquip Lorem et. Sint incididunt et quis proident labore sint nulla ipsum consectetur enim.',
    kind: PostKind.PARTNER_SCHOOL,
    author: { connect: { email: users[2].email } },
  },
  {
    title: 'Princeton University',
    content: 'Eiusmod magna dolor duis labore exercitation nostrud fugiat cupidatat excepteur sunt reprehenderit sit ullamco duis esse. Fugiat aute amet deserunt laborum velit. Commodo anim consectetur eu laborum mollit aute esse irure enim velit proident consectetur. Irure voluptate irure dolore voluptate voluptate aliqua nulla tempor nisi cupidatat aliqua nostrud cupidatat. Dolore consequat culpa minim ut culpa consequat culpa nostrud cupidatat officia aute deserunt. Ut ad mollit cupidatat culpa do pariatur pariatur mollit dolor aliquip voluptate ea. Lorem id aliqua qui sunt proident reprehenderit ad do aute dolor ea et elit exercitation consectetur.\nProident ex minim amet qui. Ex tempor veniam exercitation cillum laborum. Nisi voluptate sit velit ex velit ex nulla ullamco laboris anim culpa fugiat eu et sit. Qui sint tempor qui do mollit ullamco esse veniam amet pariatur qui. Quis veniam aliqua Lorem tempor do cupidatat pariatur est aliqua qui mollit officia sit exercitation nisi. Nulla culpa Lorem irure fugiat adipisicing ad id nostrud amet nisi ullamco quis. Eiusmod enim commodo officia aute aute incididunt labore excepteur id ea irure dolore.',
    kind: PostKind.PARTNER_SCHOOL,
    author: { connect: { email: users[2].email } },
  },
  {
    title: 'University of Toronto',
    content: 'Occaecat anim ut sint. Cupidatat laborum ut irure duis ex exercitation. Reprehenderit exercitation cupidatat nulla irure mollit. Occaecat officia anim duis exercitation consequat dolore. Irure exercitation proident ipsum sint excepteur dolor consectetur ex cupidatat ipsum aliquip anim laboris mollit proident. Et ex nisi labore nisi magna sunt occaecat velit ipsum duis sint. Amet laboris ex ex adipisicing aute ea eiusmod Lorem nostrud labore aute officia enim. Est non anim dolore ex.\nAute deserunt sit reprehenderit ullamco cillum duis voluptate esse. Non culpa ullamco mollit labore id ut in amet commodo officia voluptate fugiat ipsum ea nostrud. Occaecat nostrud reprehenderit do minim est adipisicing. Laboris nostrud anim voluptate irure velit minim ea labore qui ullamco consequat ex pariatur. Exercitation non nostrud eu non deserunt sunt sit.',
    kind: PostKind.PARTNER_SCHOOL,
    author: { connect: { email: users[2].email } },
  },

  {
    title: 'Problem with my order',
    content: 'Ipsum sit exercitation incididunt. Laborum enim ea commodo occaecat aute exercitation magna laboris velit nulla pariatur adipisicing nulla. Ex cupidatat do ad laborum occaecat laboris exercitation anim duis id veniam sint anim. Magna nulla Lorem non et sint occaecat elit magna reprehenderit sunt. Reprehenderit ipsum sit aute occaecat adipisicing minim ex esse sint duis ad sunt quis enim officia. Laboris cupidatat in mollit ipsum do cillum ad. Dolor consectetur enim eiusmod ipsum commodo Lorem laboris do voluptate id cupidatat cupidatat velit sit dolore.\nAd aliquip aliqua est aliqua. Duis qui officia mollit Lorem est amet eu. Voluptate ex et et est irure dolor cupidatat veniam magna eu et adipisicing exercitation. Velit incididunt elit ut officia occaecat et dolore cupidatat fugiat cupidatat aute. Mollit quis dolore est. Qui enim quis irure deserunt dolore occaecat adipisicing eu incididunt deserunt mollit.',
    kind: PostKind.SUPPORT_TICKET,
    author: { connect: { email: users[1].email } },
  },
  {
    title: 'I cant access my account',
    content: 'Sint dolor aliquip magna elit adipisicing. In sunt non excepteur laborum eiusmod est nulla eiusmod laborum non sunt reprehenderit duis consectetur. Culpa culpa cupidatat proident non sint aute veniam sit ad sit. Velit ea esse enim pariatur deserunt cupidatat velit quis culpa cupidatat quis officia laboris do veniam. Cupidatat pariatur in Lorem ex pariatur. Excepteur cillum et dolor voluptate et officia et magna dolore sint deserunt. Ipsum magna aliqua id voluptate. Occaecat ex adipisicing incididunt.\nAnim consectetur aute do aliquip aliquip occaecat. Velit id sint magna proident ut elit occaecat labore est amet. Dolore deserunt ea et. Excepteur eiusmod cupidatat ipsum in voluptate aute in occaecat ipsum et ipsum. Occaecat nulla cupidatat veniam magna laborum ad aliquip deserunt sint. Tempor cillum velit voluptate ex. Sit sint enim eiusmod proident pariatur minim enim id consequat.',
    kind: PostKind.SUPPORT_TICKET,
    author: { connect: { email: users[3].email } },
  },
  {
    title: 'I want more information about my data (GDPR)',
    content: 'Laboris laborum qui consectetur sit laborum qui nisi eiusmod ad esse laboris nisi. Nisi proident qui nulla ut mollit laboris. Esse nulla culpa ad qui dolore fugiat enim eiusmod exercitation excepteur consequat. Ut tempor culpa enim laborum pariatur veniam amet duis consequat. Laboris consectetur amet et ut. Cupidatat magna amet nisi. Exercitation excepteur aliqua excepteur eu officia duis.\nVoluptate dolore et amet nostrud occaecat enim enim consequat consectetur ad incididunt. Id ea id reprehenderit laborum proident mollit quis cupidatat. Duis proident non eu culpa. Ipsum velit eiusmod consectetur sint adipisicing elit id veniam enim laborum deserunt velit fugiat dolor. Incididunt reprehenderit ea consequat duis est ut qui. Quis adipisicing sunt voluptate ut ut non tempor occaecat sit.',
    kind: PostKind.SUPPORT_TICKET,
    author: { connect: { email: users[3].email } },
  },

  {
    title: 'Consectetur et do aute esse sint tempor aliquip aliquip cupidatat ad in.',
    content: 'Eu veniam ea ipsum irure. Velit veniam do exercitation veniam eiusmod pariatur non elit eiusmod anim duis ad excepteur minim. Irure aliqua ipsum sit aliquip dolore non et dolore reprehenderit consectetur consequat. Excepteur deserunt pariatur sit laboris magna aliquip aliquip quis consequat nisi enim nulla officia amet. Proident deserunt cupidatat aute enim ea non consectetur reprehenderit laboris consectetur duis ut. Non velit quis fugiat anim cillum nisi aute anim duis. Labore quis nulla enim dolore duis aliqua in do consectetur laboris. Ad dolor duis ipsum duis sint cupidatat cupidatat tempor et elit esse laboris amet.\nElit non irure in eiusmod voluptate. Dolor Lorem labore minim cupidatat nostrud fugiat veniam exercitation pariatur. Exercitation quis Lorem cillum elit qui ut nostrud eiusmod nulla excepteur qui et. Adipisicing sit aute voluptate aute occaecat aliqua ut voluptate reprehenderit aliquip enim.\nFugiat ex aliqua laboris. Cupidatat incididunt do labore proident deserunt minim aliquip enim commodo. Sint et officia minim quis minim amet in in est officia in excepteur. Elit minim ut cupidatat minim in do. Ad aute sint veniam ipsum officia deserunt ex et. Occaecat pariatur pariatur amet dolor sit et adipisicing enim. Ad enim nisi et ex do qui nostrud. Non nulla esse magna ipsum.',
    kind: PostKind.MARKETING_POST,
    category: 'Ipsum',
    imageUrl: 'https://picsum.photos/seed/1/500/500',
    author: { connect: { email: users[3].email } },
  },
  {
    title: 'Nulla anim non consectetur et cillum exercitation reprehenderit aute sit est.',
    content: 'Reprehenderit pariatur excepteur do do ad enim eu esse officia laboris cillum duis nulla. Ea eu amet dolor aliqua cillum cillum duis. Ipsum enim excepteur et tempor aute anim aliquip dolore eu proident eiusmod aliqua. Minim nostrud cupidatat nisi nisi mollit est Lorem excepteur esse aliquip. Enim excepteur aliqua enim irure nisi ad irure. Dolore excepteur sint mollit ex nisi id nisi. Magna nostrud velit non aute dolor est est voluptate deserunt occaecat sunt elit dolore adipisicing reprehenderit. Quis incididunt tempor ipsum esse reprehenderit et sint velit cupidatat sint qui.\nCupidatat pariatur velit quis do labore amet excepteur deserunt nisi. Commodo cupidatat anim nulla. In excepteur duis anim reprehenderit veniam ipsum amet quis et proident exercitation cillum quis. Cillum duis pariatur nisi est cupidatat. Excepteur esse nulla dolor cillum enim sint magna id non.',
    kind: PostKind.MARKETING_POST,
    category: 'Voluptate sunt',
    imageUrl: 'https://picsum.photos/seed/1/500/500',
    author: { connect: { email: users[3].email } },
  },
  {
    title: 'Commodo occaecat laborum cillum.',
    content: 'Ipsum laboris amet aute. Culpa magna dolor incididunt qui qui. Aliquip ut consequat occaecat reprehenderit irure anim fugiat consequat. Commodo consectetur nisi laboris nisi nostrud occaecat elit laborum excepteur. Nisi adipisicing pariatur ullamco magna tempor ex adipisicing.\nEsse occaecat amet ex sint enim dolore laboris sit incididunt esse eiusmod elit id. Fugiat esse dolore excepteur est pariatur proident fugiat voluptate irure elit dolore Lorem quis laborum ad. Ad quis duis duis dolore do. Aliquip tempor cupidatat ea. Sint irure nostrud cupidatat commodo irure aute ex fugiat nostrud nostrud nisi ut. Minim occaecat proident excepteur deserunt officia fugiat sunt mollit officia. Laborum aliqua cillum occaecat exercitation quis quis ad. Voluptate aliqua nulla in reprehenderit mollit ex.\nIncididunt anim mollit laborum ea deserunt quis qui consequat nisi. Ea magna duis pariatur non nostrud deserunt sint commodo esse consectetur enim do. Officia commodo voluptate amet cillum dolore in. Mollit ea labore sit velit consequat magna elit nisi ullamco non esse velit sint fugiat tempor. Culpa proident velit amet. Lorem mollit veniam ullamco consequat aute eiusmod.\nNostrud proident proident ullamco incididunt exercitation deserunt commodo aliquip Lorem duis adipisicing veniam proident. Consectetur consectetur commodo ipsum aliquip. Enim nulla tempor aliqua et anim mollit quis sit labore esse. Eiusmod Lorem culpa pariatur qui ullamco occaecat adipisicing id aute nulla elit excepteur. Non amet duis proident. Aliqua labore cupidatat consequat mollit sunt incididunt. Quis duis adipisicing mollit elit laboris adipisicing enim. Et tempor ullamco pariatur do mollit in ut magna.',
    kind: PostKind.MARKETING_POST,
    category: 'Culpa',
    imageUrl: 'https://picsum.photos/seed/1/500/500',
    author: { connect: { email: users[3].email } },
  },
  {
    title: 'Aute ipsum fugiat fugiat fugiat ipsum fugiat et in laboris do aliqua magna.',
    content: 'Eiusmod quis aliquip tempor exercitation commodo mollit. Voluptate sunt ad duis pariatur dolor laboris duis reprehenderit. Veniam proident pariatur occaecat magna incididunt officia pariatur ad excepteur veniam officia. Labore ex do velit consequat anim culpa. Eu non et elit adipisicing nulla.\nDolor quis anim quis proident magna officia. Irure labore consequat nostrud reprehenderit voluptate adipisicing cupidatat. Velit duis amet exercitation nisi dolore Lorem eiusmod officia dolore reprehenderit irure fugiat pariatur laborum. Qui minim et duis adipisicing ea minim consequat. Incididunt duis occaecat aute qui consequat dolore esse cupidatat exercitation. Lorem enim elit sint pariatur ut eu voluptate.\nReprehenderit minim non exercitation enim sunt ipsum laborum quis aute nulla pariatur. Excepteur ea consequat qui eiusmod. Eiusmod fugiat consectetur elit laboris. Culpa eiusmod culpa anim. Anim irure excepteur veniam irure culpa aliquip est. Enim et qui ipsum incididunt reprehenderit quis amet ut pariatur pariatur reprehenderit et ipsum.\nEa veniam Lorem id dolor ad minim aute in aute laboris nulla qui id deserunt nostrud. Amet qui proident dolore magna irure. Eu consectetur elit deserunt exercitation velit consectetur nisi ex excepteur dolore. Enim exercitation quis voluptate quis est deserunt laborum in minim est adipisicing ut.',
    kind: PostKind.MARKETING_POST,
    category: 'Ipsum',
    imageUrl: 'https://picsum.photos/seed/1/500/500',
    author: { connect: { email: users[3].email } },
  },
];

const comments = [
  {
    content: 'Veniam irure id esse esse occaecat ad. Anim nostrud in enim voluptate esse dolore eiusmod eu adipisicing ut quis aute quis nisi magna. Ex duis est esse ullamco esse labore culpa nisi.',
    post: { connect: { id: 8 } },
    author: { connect: { email: users[2].email } },
  },
  {
    content: 'Officia ut sit velit ut tempor id mollit ipsum mollit veniam pariatur exercitation ea cupidatat. Qui nisi enim voluptate exercitation dolore adipisicing velit duis exercitation labore commodo qui amet ullamco. Qui pariatur Lorem nulla Lorem laboris ea nulla elit aute consequat nulla sint tempor excepteur elit.',
    post: { connect: { id: 8 } },
    author: { connect: { email: users[1].email } },
  },
  {
    content: 'Cillum nulla quis fugiat cupidatat ea ea minim consectetur labore. Dolore aliqua aliqua laborum ipsum laboris dolore deserunt nisi Lorem nisi irure. Ea sunt proident cillum enim et reprehenderit enim et est enim.',
    post: { connect: { id: 8 } },
    author: { connect: { email: users[2].email } },
  },
  {
    content: 'Nulla pariatur pariatur excepteur. Duis laboris quis nisi minim veniam esse proident. Velit cupidatat veniam aliqua officia duis eiusmod duis non Lorem aliqua.',
    post: { connect: { id: 9 } },
    author: { connect: { email: users[2].email } },
  },
  {
    content: 'Qui consequat incididunt deserunt nostrud aliqua tempor laborum officia ut consectetur ex reprehenderit nulla. Culpa ex aliqua duis. Ipsum veniam nostrud non esse exercitation mollit cillum id laborum aliqua laborum ipsum culpa aute.',
    post: { connect: { id: 9 } },
    author: { connect: { email: users[3].email } },
  },
  {
    content: 'Cillum tempor laborum laboris tempor duis eu laborum anim sunt ut labore eiusmod.',
    post: { connect: { id: 9 } },
    author: { connect: { email: users[2].email } },
  },
  {
    content: 'Do officia Lorem dolore do nisi eu tempor. Amet cupidatat amet aute adipisicing amet velit in culpa fugiat pariatur eiusmod ex anim. Ex pariatur occaecat aute laborum non voluptate eiusmod dolore dolore laboris.',
    post: { connect: { id: 9 } },
    author: { connect: { email: users[3].email } },
  },
];

async function main(): Promise<void> {
  await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      builtIn: true,
      permissionTransactions: TransactionPermissions.ReadTransaction,
      permissionPosts: PostPermissions.ReadSupportPost
        | PostPermissions.CreateSupportPost
        | PostPermissions.UpdateOwnSupportPost
        | PostPermissions.DeleteOwnSupportPost,
      permissionComments: CommentPermissions.ReadSupportComment
        | CommentPermissions.CreateSupportComment
        | CommentPermissions.UpdateOwnSupportComment
        | CommentPermissions.DeleteOwnSupportComment,
      permissionUsers: UserPermissions.ReadUser,
      permissionRoles: 0,
    },
  });

  await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      builtIn: true,
      permissionTransactions: PermissionHelper.AllTransactions,
      permissionPosts: PermissionHelper.AllPosts,
      permissionComments: PermissionHelper.AllComments,
      permissionUsers: PermissionHelper.AllUsers,
      permissionRoles: PermissionHelper.AllRoles,
    },
  });

  const userRequests: Array<Promise<User>> = [];

  for (const user of users) {
    // eslint-disable-next-line no-await-in-loop
    const password = await bcrypt.hash(user.password, 10);

    userRequests.push(
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          ...user,
          password,
        },
      }),
    );
  }

  await Promise.all(userRequests);

  const transactionRequests: Array<Promise<Transaction>> = [];

  for (const transaction of transactions) {
    transactionRequests.push(
      prisma.transaction.create({ data: transaction }),
    );
  }

  await Promise.all(transactionRequests);

  const postRequests: Array<Promise<Post>> = [];

  for (const post of posts) {
    postRequests.push(
      prisma.post.create({ data: post }),
    );
  }

  await Promise.all(postRequests);

  const commentRequests: Array<Promise<Comment>> = [];

  for (const comment of comments) {
    commentRequests.push(
      prisma.comment.create({ data: comment }),
    );
  }

  await Promise.all(commentRequests);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  });
