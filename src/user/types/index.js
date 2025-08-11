/**
 * @typedef {Object} Guide
 * @property {number} id
 * @property {string} name
 * @property {string} image
 * @property {string} location
 * @property {string} description
 * @property {string} bio
 * @property {string} [contact]
 * @property {number} rating
 * @property {string} experience
 */

/**
 * @typedef {Object} Hotel
 * @property {number} id
 * @property {string} name
 * @property {string[]} images
 * @property {string} description
 * @property {string} location
 * @property {number} [pricePerNight]
 * @property {string} [ownerName]
 * @property {string} [ownerContact]
 * @property {number} rating
 * @property {string[]} amenities
 */

/**
 * @typedef {Object} ShopItem
 * @property {number} id
 * @property {string} name
 * @property {string} image
 * @property {string} description
 * @property {number} price
 */

/**
 * @typedef {Object} Shop
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} location
 * @property {string} ownerName
 * @property {string} [ownerContact]
 * @property {ShopItem[]} items
 * @property {number} rating
 */

/**
 * @typedef {Object} Vehicle
 * @property {number} id
 * @property {string} name
 * @property {string[]} images
 * @property {string} description
 * @property {string} location
 * @property {number} pricePerDay
 * @property {string} mileage
 * @property {boolean} withDriver
 * @property {string} ownerName
 * @property {string} ownerContact
 * @property {number} rating
 * @property {string} type
 */

/**
 * @typedef {'guides' | 'hotels' | 'shops' | 'vehicles'} Section
 */
