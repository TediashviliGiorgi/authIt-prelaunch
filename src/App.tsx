import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PrelaunchBadge } from "@/components/prelaunch/PrelaunchBadge"; // <--- 1. დაემატა იმპორტი
import './i18n/config';

// Pages
import Index from "./pages/Index";
import FeaturesPage from "./pages/FeaturesPage";

import ManifestoPage from "./pages/ManifestoPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Solutions
import ELabelingPage from "./pages/solutions/ELabelingPage";
import GS1CompliancePage from "./pages/solutions/GS1CompliancePage";
import DPPReadyPage from "./pages/solutions/DppReadyPage";
import SupplyChainPage from "./pages/solutions/SupplyChainPage";
import GrayMarketPage from "./pages/solutions/GrayMarketsPage";
import AuthItAIPage from "./pages/solutions/AuthItAiPage";

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="authit-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          
          {/* <--- 2. აქ დაემატა კომპონენტი, რომ ყველა გვერდზე გამოჩნდეს */}
          <PrelaunchBadge /> 

          <div className="pb-20">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/manifesto" element={<ManifestoPage />} />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Solutions Routes */}
              <Route path="/solutions/e-labeling" element={<ELabelingPage />} />
              <Route path="/solutions/gs1-compliance" element={<GS1CompliancePage />} />
              <Route path="/solutions/dpp-ready" element={<DPPReadyPage />} />
              <Route path="/solutions/supply-chain" element={<SupplyChainPage />} />
              <Route path="/solutions/gray-market" element={<GrayMarketPage />} />
              <Route path="/solutions/authit-ai" element={<AuthItAIPage />} />
              
              {/* Login/Register - For now redirect to contact or show coming soon */}
              <Route path="/login" element={<ContactPage />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
  </ThemeProvider>
);

export default App;