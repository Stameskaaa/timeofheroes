export const formatDateTimeDetailed = (dateString: string | null | undefined): string => {
  if (
    !dateString ||
    dateString.trim() === '' ||
    dateString === 'undefined' ||
    dateString === 'null'
  ) {
    return 'Дата не указана';
  }

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const timezoneOffsetMs = date.getTimezoneOffset() * 60 * 1000;

    const adjustedDate = new Date(date.getTime() - timezoneOffsetMs);

    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];

    const day = adjustedDate.getDate();
    const month = months[adjustedDate.getMonth()];
    const hours = adjustedDate.getHours().toString().padStart(2, '0');
    const minutes = adjustedDate.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} в ${hours}:${minutes}`;
  } catch (error) {
    return '';
  }
};
