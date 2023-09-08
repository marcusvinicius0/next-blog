export interface BlogProps {
  title: string;
  content: string;
  category: string;
  image: string;
  link: string;
  likes: string[];
  postedBy: {
    name: string;
  };
  createdAt: Date;
}