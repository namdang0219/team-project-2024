export type PhotoType = {
    photoId: string;
	author: string;
	uri: string;
	location: {
		lat: number;
		long: number;
	};
	create_at: number;
	update_at: number;
};
