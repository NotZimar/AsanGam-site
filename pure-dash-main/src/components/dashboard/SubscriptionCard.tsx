import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const SubscriptionCard = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(65), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="bg-white/10 backdrop-blur-md p-6 h-full">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Subscription period</h3>
        <p className="text-muted-foreground">Six months and three days</p>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="progress-bar bg-muted h-3">
            <div 
              className="progress-fill h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-right">{progress}% remaining</p>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionCard;