const USER_ROLES = {
  guest: 'guest',
  admin: 'admin',
  manager: 'manager',
  foodProvider: 'food-provider',
}

const DEVICE_TYPES = {
  temperature: 'temperature',
  light: 'light',
  humidity: 'humidity',
}
const CURRENCY = { usd: 'usd', eur: 'eur', uah: 'uah' }
const ORDER_STATUSES = {
  pending: 'pending',
  confirmed: 'confirmed',
  completed: 'completed',
  cancelled: 'cancelled',
}
const EVENT_STATUSES = {
  planned: 'planned',
  ongoing: 'ongoing',
  finished: 'finished',
  cancelled: 'cancelled',
}

module.exports = {
  USER_ROLES,
  DEVICE_TYPES,
  CURRENCY,
  ORDER_STATUSES,
  EVENT_STATUSES,
}
