import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WebsiteCard = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md p-6 h-full">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Website</h3>
        <div className="space-y-3">
          <Button className="btn-coffee w-full">
            Edit my website
          </Button>
          <Button className="btn-coffee-outline w-full">
            My website
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WebsiteCard;