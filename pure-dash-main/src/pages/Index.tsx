import ProfileCard from "@/components/dashboard/ProfileCard";
import WebsiteCard from "@/components/dashboard/WebsiteCard";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import TasksCard from "@/components/dashboard/TasksCard";
import AddressCard from "@/components/dashboard/AddressCard";
import coffeeShopHero from "@/assets/bg asangam acount 2.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-cover bg-center" style={{ backgroundImage: `url(${coffeeShopHero})` }}>
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Column - Profile Section */}
        <div className="relative flex items-center justify-center p-8">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"

          />
          <div className="absolute inset-0 " />
          
          {/* Profile Card */}
          <div className="relative z-10 float-animation">
            <ProfileCard 
              cafeName="Artisan Coffee Co."
              level={4}
              username="coffee_master"
              fullName="John Doe"
            />
          </div>
        </div>

        {/* Right Column - Dashboard Cards */}
        <div className="flex items-center p-8">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">
              <WebsiteCard />
              <SubscriptionCard />
              <TasksCard />
              <AddressCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
