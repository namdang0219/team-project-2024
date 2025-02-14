export const formatDate = (timestamp: number) => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Thêm 0 nếu < 10
	const day = String(date.getDate()).padStart(2, "0"); // Thêm 0 nếu < 10
	return `${year}/${month}/${day}`;
};
