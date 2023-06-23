import type { NextFunction, Response } from "express";
import passport from "passport";
import { safeUser } from "../utils/safeUser";
import type { Request } from "../utils/types";
import { loginUser } from "../validators/auth";

// Handles the login request
export function logIn(req: Request, res: Response, next: NextFunction): void {
  loginUser.parse(req.body); // Parses and validates the login user data
  passport.authenticate("local", { successMessage: "Logged In" })(
    req,
    res,
    next
  );
  // Authenticates the user using the 'local' strategy with options and calls the passport middleware
  // If authentication succeeds, it invokes the next middleware, otherwise returns an error response
}

// Returns the currently authenticated user's information
export function me(req: Request, res: Response): void {
  res.status(200).json(safeUser(req.user!));
  // Responds with a JSON object containing the safe user data retrieved from req.user
  // The req.user object should be populated with user information after authentication
}

// Handles the logout request
export function logOut(req: Request, res: Response): void {
  req.logOut((err) => {
    if (err) res.status(500).json({ message: "Error logging out" });
    else res.status(200).json({ message: "Logged Out" });
  });
  // Logs out the currently authenticated user by calling req.logOut()
  // If an error occurs during logout, it sends a 500 status code with an error message
  // If logout is successful, it sends a 200 status code with a success message
}
