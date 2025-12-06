import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommunityHero from '@/components/community/CommunityHero';
import BroadcastPanel from '@/components/community/BroadcastPanel';
import CategoryFilters from '@/components/community/CategoryFilters';
import CommunityFeed from '@/components/community/CommunityFeed';
import ShareIssueSection from '@/components/community/ShareIssueSection';
import ExpertAnswers from '@/components/community/ExpertAnswers';
import StaffReporting from '@/components/community/StaffReporting';
import Leaderboard from '@/components/community/Leaderboard';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-shakespeare-50">
      <Header />
      
      {/* Add padding to prevent header overlap */}
      <div className="pt-20">
        {/* Hero Section */}
        <CommunityHero />
        
        {/* Broadcast Panel */}
        <BroadcastPanel />
        
        {/* Category Filters */}
        <CategoryFilters />
        
        {/* Community Feed */}
        <CommunityFeed />
        
        {/* Share Issue Section */}
        <ShareIssueSection />
        
        {/* AI-Powered Answers (removed human expert) */}
        <ExpertAnswers />
        
        {/* Staff Reporting to Admin */}
        <StaffReporting />
        
        {/* Leaderboard */}
        <Leaderboard />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}