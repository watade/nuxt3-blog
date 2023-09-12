export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate(datetime: string): string {
        const date = new Date(datetime);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}年${month}月${day}日`;
        return formattedDate;
      },
    },
  };
});
