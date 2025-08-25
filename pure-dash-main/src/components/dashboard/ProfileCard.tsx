import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import profileAvatar from "@/assets/profile-avatar.jpg";

interface ProfileCardProps {
  cafeName: string;
  level: number;
  username: string;
  fullName: string;
}

const ProfileCard = ({ cafeName = "Caffe Name", level = 4, username = "Username", fullName = "Name" }: ProfileCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {/* Avatar */}
        <div className="relative">
          <div className="profile-avatar w-24 h-24 mx-auto pulse-glow">
            <img 
              src={profileAvatar} 
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Cafe Name */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{cafeName}</h2>
          <div className="level-badge inline-block">
            Level {level}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">{username}</p>
          <p className="text-muted-foreground">{fullName}</p>
        </div>

        {/* Edit Button */}
        <Button className="btn-coffee w-full">
          Edit profile
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;