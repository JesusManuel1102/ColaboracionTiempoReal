import { Request, Response } from "express";
import { ProfileService } from "@repo/domain/profile-domain";

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  public async getProfileByUserId(req: Request, res: Response): Promise<void> {
    const { userId } = (req as any).user;

    if (!userId) {
      res.status(401).json({ message: "User ID not found" });
    }
    const profile = await this.profileService.getProfileByUserId(userId!);

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      userId: profile?.getProps().userId,
      username: profile?.getProps().username,
      email: profile?.getProps().email,
      bio: profile?.getProps().bio,
      avatarUrl: profile?.getProps().avatarUrl,
    });
  }

  public async deleteProfile(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    await this.profileService.deleteProfile(userId!);
    res.status(204).send();
  }

  public async updateProfile(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { bio, avatarUrl } = req.body;
    const profile = await this.profileService.updateProfile(
      userId!,
      bio,
      avatarUrl
    );
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  }
}
