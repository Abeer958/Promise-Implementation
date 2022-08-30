const STATE = {
FULFILLED: 'fulfilled',
REJECTED: 'rejected',
PENDING: 'pending'
}

class MyPromise {
    #thenCbs = []
    #catchCbs = []
    #state = STATE.PENDING
    #value
    #onSuccessBind = this.#onSuccess.bind(this)
    #onFailBind = this.#onFail.bind(this)

  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailBind);
    } catch (e) {
      this.#onFail(e);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
        this.#thenCbs.forEach(callback => {
            callback(this.#value)
        })
        this.#thenCbs = []
    }
    if (this.#state === STATE.REJECTED) {
        this.#catchCbs.forEach(callback => {
            callback(this.#value)
        })
        this.#catchCbs = []
    }
  }
  

  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return
    this.#value = value
    this.#state = STATE.FULFILLED
    this.#runCallbacks()
  }

  #onFail(value) {
    if (this.#state !== STATE.PENDING) return
    this.#value = value
    this.#state = STATE.REJECTED
    this.#runCallbacks()
  }

  then(thenCb, catchCb) {
    if (thenCb != null) this.#thenCbs.push(thenCb)
    if (catchCb != null) this.#catchCbs.push(catchCb)
    this.#runCallbacks()
  }

  catch(cb) {
    this.then(undefined, cb)
  }
  
  finally(cb) {

  }
}

module.exports = MyPromise;
