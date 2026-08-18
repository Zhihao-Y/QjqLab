import { notFound } from "next/navigation";
import { MaterialProfileClient } from "./MaterialProfileClient";
import { materialMembers, materialMemberSlugs } from "../../../data/materialMembers";

type TeamMaterialPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return materialMemberSlugs.map((slug) => ({ slug }));
}

export default async function TeamMaterialPage({ params }: TeamMaterialPageProps) {
  const { slug } = await params;
  const member = materialMembers.find((item) => item.slug === slug);

  if (!member) {
    notFound();
  }

  return <MaterialProfileClient member={member} />;
}
