/**
 * Model User
 *
 */
export type User = {
  id: string;
  username: string;
  passwordHash: string;
};

/**
 * Model Post
 *
 */
export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  countyId: string;
  slug: string;
  createdAt: Date;
  genre: Genre;
};

/**
 * Model County
 *
 */
export type County = {
  name: string;
  abbreviation: string;
  country: string;
  slug: string;
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Genre: {
  Rock: "Rock";
  Blues: "Blues";
  Jazz: "Jazz";
  Indie: "Indie";
  Reggae: "Reggae";
  Pop: "Pop";
  Electronic: "Electronic";
  None: "None";
  Other: "Other";
};

export type CountyApiResponse = County & { _count: { post: number } };

export type byCountry = {
  country: string;
  posts: number;
};

export type CountyPageResponse = County & {
  post: posts;
  _count: { post: number };
};

export type Posts = PostWithUsername[];

export type PostWithUsername = Post & {
  author: {
    username: string;
  };
};

export type User = {
  id: string;
  username: string;
  passwordHash: string;
};

type Message = {
  id: number;
  authorId: string;
  convoId: number;
  createdAt: Date;
  content: string;
  title: string;
  read: boolean;
};

type conversation = {
  id: number;
};

export type UserDashboardResponse = {
  id: string;
  posts: Post[];
  username: string;
  conversation: (conversation & {
    messages: Message[];
    user: {
      id: string;
      username: string;
    }[];
  })[];
};

type convoResponse = conversation & {
  user: {
    id: string;
    username: string;
  }[];
  messages: {
    createdAt: Date;
    content: string;
    title: string;
    id: number;
    authorId: string;
    read: boolean;
    user: {
      id: string;
      username: string;
    };
  }[];
};

export type DashboardMessages = {
  createdAt: Date;
  content: string;
  title: string;
  id: number;
  authorId: string;
  read: boolean;
  user: {
    id: string;
    username: string;
  };
}[];

export type PostsByUser =
  | (User & {
      posts: {
        id: string;
        title: string;
        content: string;
        genre: Genre;
        countyId: string;
        createdAt: string;
      }[];
    })
  | null;

export type MessagesByUser = {
  id: string;
  conversation: (conversation & {
    user: {
      id: string;
      username: string;
    }[];
    hideConvo: UserHideConvo[];
    messages: Message[];
  })[];
};

type convosdsadsa = MessagesByUser["conversation"];
