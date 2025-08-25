import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const TasksCard = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(80), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="bg-white/10 backdrop-blur-md p-6 h-full">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Tasks</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Complete tasks to level up and unlock benefits
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Level 4/5</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-bar bg-muted h-3">
            <div 
              className="progress-fill h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TasksCard;