export interface RestaurantStatus {
  isOpen: boolean;
  statusText: string;
  badgeLabel: string;
  hoursDetail: string;
}

export function getRestaurantStatus(): RestaurantStatus {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    
    const parts = formatter.formatToParts(new Date());
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
    const currentMinutes = hour * 60 + minute;

    // Opening: 12:00 PM = 12 * 60 = 720 minutes
    // Closing: 4:00 AM next day = 4 * 60 = 240 minutes
    const isOpen = currentMinutes >= 720 || currentMinutes < 240;

    if (isOpen) {
      return {
        isOpen: true,
        statusText: "Open Now • Closes 4:00 AM",
        badgeLabel: "Open Now",
        hoursDetail: "Serving Dine-in, Takeaway & Late-Night Delivery (Till 4 AM)",
      };
    } else {
      return {
        isOpen: false,
        statusText: "Opens at 12:00 PM",
        badgeLabel: "Opens 12:00 PM",
        hoursDetail: "Accepting Advance Orders for 12 PM Delivery",
      };
    }
  } catch {
    return {
      isOpen: true,
      statusText: "Open Now • Closes 4:00 AM",
      badgeLabel: "Open Now",
      hoursDetail: "Dine-in, Takeout & Delivery (Till 4 AM)",
    };
  }
}
