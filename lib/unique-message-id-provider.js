'use strict'

const NumberAllocator = require('number-allocator').NumberAllocator

/**
 * UniqueMessageAllocator constructor
 * @constructor
 */
class UniqueMessageIdProvider {
  constructor () {
    if (!(this instanceof UniqueMessageIdProvider)) {
      return new UniqueMessageIdProvider()
    }

    this.numberAllocator = new NumberAllocator(1, 65535)
  }

  /**
   * allocate
   *
   * Get the next messageId.
   * @return if messageId is fully allocated then return null,
   *         otherwise return the smallest usable unsigned int messageId.
   */
  allocate () {
    this.lastId = this.numberAllocator.alloc()
    return this.lastId
  }

  /**
   * getLastAllocated
   * Get the last allocated messageId.
   * @return unsigned int
   */
  getLastAllocated () {
    return this.lastId
  }

  /**
   * register
   * Register messageId. If success return true, otherwise return false.
   * @param { unsigned int } - messageId to register,
   * @return boolean
   */
  register (messageId) {
    return this.numberAllocator.use(messageId)
  }

  /**
   * deallocate
   * Deallocate messageId.
   * @param { unsigned int } - messageId to deallocate,
   */
  deallocate (messageId) {
    this.numberAllocator.free(messageId)
  }

  /**
   * clear
   * Deallocate all messageIds.
   */
  clear () {
    this.numberAllocator.clear()
  }
}

module.exports = UniqueMessageIdProvider
