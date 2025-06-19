// src/components/types.ts

export interface StoreHoursSchedule {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  }
  
  export interface Store {
    id: number;
    name: string;
    address: string;
    distance: string;
    phone: string;
    hours: {
      today: string;
      schedule: StoreHoursSchedule;
    };
    image: string;
  }