import { IAlbum } from "types/IAlbum";

export const albumMocks: IAlbum[] = [
	{
		aid: 1,
		title: "Album 1",
		desc: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",
		cover: "https://i.pinimg.com/736x/ad/6c/34/ad6c34d99197000f57891ef033cf3bbf.jpg",
		favorite: true,
		taggedFriends: [1, 2, 3, 4, 5],
		images: [
			{
				iid: "1",
				uri: "https://i.pinimg.com/736x/02/c1/de/02c1dec78fa478ed71f10fdf3c579817.jpg",
			},
			{
				iid: "2",
				uri: "https://i.pinimg.com/736x/1f/3d/c3/1f3dc3f053791649529894442384792f.jpg",
			},
		],
	},
	{
		aid: 2,
		title: "Album 2",
		desc: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",
		cover: "https://i.pinimg.com/736x/da/7c/e8/da7ce881bb1c58f3568dcad560c557b8.jpg",
		favorite: false,
		taggedFriends: [2, 3],
		images: [],
	},
	{
		aid: 3,
		title: "Album 3",
		desc: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",
		cover: "https://i.pinimg.com/736x/84/ed/24/84ed241219f9bd557cd3fffc24eac2d1.jpg",
		favorite: false,
		taggedFriends: [3, 4, 5],
		images: [],
	},
	{
		aid: 4,
		title: "Album 4",
		desc: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",
		cover: "https://i.pinimg.com/736x/75/52/4e/75524ed21bfb73508e4945d808cbc52e.jpg",
		favorite: true,
		taggedFriends: [],
		images: [],
	},
	{
		aid: 5,
		title: "Album 5",
		desc: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",
		cover: "https://i.pinimg.com/736x/d2/09/b6/d209b63cc2f90059e49b166b2f956a05.jpg",
		favorite: false,
		taggedFriends: [6],
		images: [],
	},
	{
		aid: 6,
		title: "Album 6",
		desc: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",
		cover: "https://i.pinimg.com/736x/5c/08/1e/5c081ed7556a1fc85d7c55104a7aa49e.jpg",
		favorite: true,
		taggedFriends: [3, 4, 5, 6],
		images: [],
	},
];
