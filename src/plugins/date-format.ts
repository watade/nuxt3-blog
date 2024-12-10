import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate(datetime: string): string {
        return dayjs(datetime).locale(ja).format('YYYY年MM月DD日');
      },
    },
  };
});
