import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LearningHero from '@/components/learn/LearningHero';
import IndiaMap from '@/components/learn/IndiaMap';
import WaterJourney from '@/components/learn/WaterJourney';
import PlantExplorer from '@/components/learn/PlantExplorer';
import PlatformGuide from '@/components/learn/PlatformGuide';
import ModulesGrid from '@/components/learn/ModulesGrid';
import QuizSection from '@/components/learn/QuizSection';
import CTASection from '@/components/learn/CTASection';
import WavyDivider from '@/components/WavyDivider';

export default function LearnPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Section 1: Hero */}
      <LearningHero />
      
      {/* Section 2: Interactive India Map */}
      <IndiaMap />
      
      <WavyDivider className="transform rotate-180" color="shakespeare-50" />
      
      {/* Section 3: Water Journey Story */}
      <WaterJourney />
      
      <WavyDivider color="shakespeare-200" />
      
      {/* Section 4: 3D Treatment Plant Explorer */}
      <PlantExplorer />
      
      <WavyDivider className="transform rotate-180" color="shakespeare-900" />
      
      {/* Section 5: Platform Guide for Employees */}
      <PlatformGuide />
      
      <WavyDivider color="shakespeare-100" />
      
      {/* Section 6: Mini-Courses Grid */}
      <ModulesGrid />
      
      <WavyDivider color="shakespeare-50" />
      
      {/* Section 7: Water Quiz */}
      <QuizSection />
      
      {/* Section 8: CTA */}
      <CTASection />
      
      <Footer />
    </main>
  );
}