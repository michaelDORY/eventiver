const User = require('./User.js')
const Guest = require('./Guest.js')
const Manager = require('./Manager.js')
const ManagerRating = require('./ManagerRating.js')
const EventGuest = require('./EventGuest.js')
const Event = require('./Event.js')
const EventType = require('./EventType.js')

const FoodProvider = require('./food/FoodProvider.js')
const Category = require('./food/Category.js')
const MenuItem = require('./food/MenuItem.js')
const Order = require('./food/Order.js')
const OrderItem = require('./food/OrderItem.js')

const Device = require('./device/Device.js')
const DeviceEvent = require('./device/DeviceEvent.js')

// relations
Category.hasMany(MenuItem)

FoodProvider.hasMany(MenuItem, { onDelete: 'CASCADE', hooks: true })
FoodProvider.hasMany(Order)

MenuItem.belongsTo(Category, { foreignKey: 'categoryId' })
MenuItem.belongsTo(FoodProvider, { foreignKey: 'foodProviderId' })
MenuItem.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: 'menuItemId',
  as: 'orders',
});
MenuItem.hasMany(OrderItem, { onDelete: 'CASCADE', hooks: true })

Order.belongsTo(Event, { foreignKey: 'eventId' })
Order.belongsTo(Manager, { foreignKey: 'managerId' })
Order.belongsTo(FoodProvider, { foreignKey: 'foodProviderId' })
Order.hasMany(OrderItem, { onDelete: 'CASCADE', hooks: true })

OrderItem.belongsTo(Order, { foreignKey: 'orderId' })
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' })

Event.hasOne(Order)
Event.hasMany(DeviceEvent)
Event.belongsTo(EventType, { foreignKey: 'eventTypeId' })
Event.belongsTo(Manager, { foreignKey: 'managerId' })
Event.belongsToMany(Guest, {
  through: EventGuest,
  foreignKey: 'eventId',
  as: 'guests',
})

EventType.hasMany(Event)

Guest.belongsToMany(Event, {
  through: EventGuest,
  foreignKey: 'guestId',
  as: 'events',
})
Guest.hasMany(ManagerRating)

Manager.belongsTo(User, { foreignKey: 'userId' })
Manager.hasMany(Event)
Manager.hasMany(ManagerRating, { onDelete: 'CASCADE', hooks: true })
Manager.hasMany(Device)
Manager.hasMany(Order)

ManagerRating.belongsTo(Manager, { foreignKey: 'managerId' })
ManagerRating.belongsTo(Guest, { foreignKey: 'guestId' })

User.hasOne(Manager)
User.hasOne(Guest)
User.hasOne(FoodProvider)

Device.hasMany(DeviceEvent)
Device.belongsTo(Manager, { foreignKey: 'managerId' })

DeviceEvent.belongsTo(Device, { foreignKey: 'deviceId' })
DeviceEvent.belongsTo(Event, { foreignKey: 'eventId' })

module.exports = {
  UserModel: User,
  GuestModel: Guest,
  ManagerModel: Manager,
  ManagerRatingModel: ManagerRating,
  EventGuestModel: EventGuest,
  EventModel: Event,
  EventTypeModel: EventType,
  FoodProviderModel: FoodProvider,
  CategoryModel: Category,
  MenuItemModel: MenuItem,
  OrderModel: Order,
  OrderItemModel: OrderItem,
  DeviceModel: Device,
  DeviceEventModel: DeviceEvent,
}
