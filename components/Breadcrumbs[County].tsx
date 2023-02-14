import { Breadcrumb, BreadcrumbLink, BreadcrumbItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function BreadcrumbsCounty({
  countyName,
}: {
  countyName: string;
}) {
  const router = useRouter();

  return (
    <Breadcrumb separator={">"}>
      <BreadcrumbItem
        onClick={() => {
          router.push("/");
        }}
      >
        <BreadcrumbLink>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem
        onClick={() => {
          router.push("/");
        }}
      >
        <BreadcrumbLink>England</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>{countyName}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
