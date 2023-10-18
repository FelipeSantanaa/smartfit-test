import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const openingHours = {
  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '12',
    last: '18',
  },
  night: {
    first: '18',
    last: '23',
  },
};

type hourIndex = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root',
})
export class FilterUnitsService {
  constructor() {}

  transformWeekDay(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  filterUnits(unit: Location, open_hour: string, close_hour: string) {
    if (!unit.schedules) return true;
    let open_hour_filter = parseInt(open_hour, 10);
    let close_hour_filter = parseInt(close_hour, 10);

    let todays_weekday = this.transformWeekDay(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;

      if (todays_weekday == schedule_weekday) {
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ');
          let unit_open_hour_int = +unit_open_hour.replace('h', '');
          let unit_close_hour_int = +unit_close_hour.replace('h', '');

          if (
            unit_open_hour_int <= open_hour_filter &&
            unit_close_hour_int >= close_hour_filter
          )
            return true;
          else return false;
        }
      }
    }
    return false;
  }

  filter(results: Location[], showClosed: boolean, hour: string) {
    let intermediateResults = results;

    // Abertas ou fechadas
    if (!showClosed) {
      intermediateResults = results.filter(
        (location) => location.opened === true
      );
    }
    if (hour) {
      const openHour = openingHours[hour as hourIndex].first;
      const closeHour = openingHours[hour as hourIndex].last;
      return intermediateResults.filter((location) =>
        this.filterUnits(location, openHour, closeHour)
      );
    } else {
      return intermediateResults;
    }
  }
}
