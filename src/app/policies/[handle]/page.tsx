import { getPolicyByHandle } from "@/services/policy.service";
import { notFound } from "next/navigation";
import { CartProvider } from "@/context/CartProvider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

export const revalidate = 3600; // revalidate every hour

export default async function PolicyPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const policy = await getPolicyByHandle(resolvedParams.handle);

  if (!policy) {
    notFound();
  }

  return (
    <CartProvider>
      <main className="relative w-full bg-background text-foreground min-h-screen antialiased flex flex-col">
        <Navigation alwaysSticky={true} />
        <CartDrawer />
        
        <div className="bg-background flex-grow pt-32 pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-8">
              {policy.title}
            </h1>
            {/* Prose styling for the HTML content using Tailwind arbitrarily */}
            <div 
              className="prose prose-lg text-muted [&>p]:mb-6 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-foreground [&>h1]:mb-4 [&>h1]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mb-4 [&>h2]:mt-8 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mb-3 [&>h3]:mt-6 [&>h4]:text-lg [&>h4]:font-bold [&>h4]:text-foreground [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>li]:mb-2 [&>a]:underline [&>a]:text-black hover:[&>a]:text-black/70"
              dangerouslySetInnerHTML={{ __html: policy.body }}
            />
          </div>
        </div>
        
        <Footer />
      </main>
    </CartProvider>
  );
}
