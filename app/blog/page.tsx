import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import BlogGrid from "@/components/sections/BlogGrid";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Insights That Drive Growth"
        sub="Practical strategies, real-world notes and frameworks to help your venue build a stronger brand and fuller tables."
      />
      <BlogGrid variant="all" />
      <CtaBlock />
    </>
  );
}
