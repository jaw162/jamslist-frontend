import { GetServerSidePropsContext } from "next";
import { API_URL } from "@/config";
import Layout from "@/components/Layout";
import { CountyPageResponse, PostWithUsername } from "..";
import { Button, Container, Flex } from "@chakra-ui/react";
import BreadcrumbsCounty from "@/components/Breadcrumbs[County]";
import PostsView from "@/components/PostsView";
import ReplyToPostModal from "@/components/ReplyToPostModal";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Paginate from "@/components/Paginate";
import PostListingModal from "@/components/PostListingModal";

export default function CountyPage({
  countyData,
}: {
  countyData: CountyPageResponse;
}) {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [replyWindow, setReplyWindowClicked] = useState(false);
  const [message, setMessage] = useState<{
    userToId: string;
    title: string;
    content: string;
  }>({
    userToId: "",
    title: "",
    content: "",
  });

  const router = useRouter();
  const page = router.query.page as string;

  const onReplyClick = useCallback((el: PostWithUsername) => {
    setMessage(m => ({ ...m, userToId: el.authorId, title: el.title }));
    setReplyWindowClicked(true);
  }, []);

  const totalPages = Math.ceil(countyData._count.post / 10);

  return (
    <Layout makeLarge={true}>
      <Container
        as="aside"
        m={"0"}
        maxW={"100vw"}
        bg={"blackAlpha.900"}
        color={"whiteAlpha.900"}
      >
        {postModalOpen && (
          <PostListingModal
            setPostModalOpen={setPostModalOpen}
            countyId={countyData.name}
          />
        )}
        <Flex
          m={"0 auto"}
          maxWidth={"maxWidth"}
          p={"1rem"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <BreadcrumbsCounty countyName={countyData.name} />
          <Button
            zIndex={"0"}
            color={"black"}
            onClick={() => setPostModalOpen(true)}
          >
            Post an Ad
          </Button>
        </Flex>
        <Flex
          m={"0 auto"}
          maxWidth={"maxWidth"}
          flexDir={"row"}
          alignItems={"center"}
          fontSize={"1.3rem"}
          p={".5rem"}
        >
          <Paginate
            countyData={countyData}
            totalPages={totalPages}
            page={page}
            router={router}
          />
        </Flex>
        <Container
          display={"grid"}
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
          }}
          maxW={"maxWidth"}
          p={0}
          color={"blackAlpha.900"}
          gap={"1rem"}
        >
          <PostsView onReply={onReplyClick} posts={countyData.post} />
          <Flex
            flexDir={"row"}
            alignItems={"center"}
            fontSize={"1.3rem"}
            p={".5rem"}
          >
            <Paginate
              countyData={countyData}
              totalPages={totalPages}
              page={page}
              router={router}
            />
          </Flex>
        </Container>
      </Container>
      {replyWindow ? (
        <ReplyToPostModal
          message={message}
          setReplyWindowClicked={setReplyWindowClicked}
          setMessage={setMessage}
        />
      ) : null}
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { county, page } = ctx.query;

  const data = await fetch(
    `${API_URL}/api/counties/${county}?page=${Number(page)}`
  );

  const { county: countyData } = await data.json();

  if (!countyData) return { notFound: true };

  return { props: { countyData } };
}
