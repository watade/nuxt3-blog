import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate(datetime: string): string {
        return dayjs(datetime).tz('Asia/Tokyo').format('YYYY年MM月DD日');
      },
    },
  };
});
