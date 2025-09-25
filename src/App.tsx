import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import SafetyPage from "./pages/SafetyPage";
import UniversityPartnersPage from "./pages/UniversityPartnersPage";
import PricingPage from "./pages/PricingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import MessagesPage from "./pages/MessagesPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import NavigationPage from "./pages/NavigationPage";
import CreateListingPage from "./pages/CreateListingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/universities" element={<UniversityPartnersPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/navigation" element={<NavigationPage />} />
            <Route path="/create-listing" element={<CreateListingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit/:section" element={<EditProfilePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
