import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import mapPreview from "@/assets/map-preview.jpg";

const AddressCard = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md p-6 h-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Address</h3>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>123 Coffee Street</p>
            <p>Downtown District</p>
            <p>New York, NY 10001</p>
          </div>
          
          {/* Map Preview */}
          <div className="relative overflow-hidden rounded-lg border border-border">
            <img 
              src={mapPreview} 
              alt="Location preview"
              className="w-full h-24 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;