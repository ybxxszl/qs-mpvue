<!-- 菩提本无树，明镜亦非台；本来无一物，何处惹尘埃。 -->

<!-- <template>
  <div>
    <a href="/pages/index/main" class="home">去往首页</a>
    <p>会改变的信息: {{message}}</p>
    <p v-once>不会改变的信息: {{message}}</p>
    <p>反转: {{reversedMessage}}</p>
    <p>{{fullName}}</p>
    <p>{{now}}</p>
    <div :id="id"></div>
    <div v-if="flag === 'A'">A</div>
    <div v-else-if="flag === 'B'">B</div>
    <div v-else>NOT A/B</div>
  </div>
</template> -->

<!-- <template>
  <div>
    <div v-if=type>
      <label>账号1</label>
      <input placeholder="Enter your account 1" key="account1-input">
    </div>
    <div v-else>
      <label>账号2</label>
      <input placeholder="Enter your account 2" key="account2-input">
    </div>
    <button @click="changeType()">change</button>
  </div>
</template> -->

<!-- <template>
  <div>
    <li v-for="(item, index) in items" :key="index">{{index}} - {{item}}</li>
    <button @click="pushItem()">push</button>
    <button @click="popItem()">pop</button>
    <button @click="shiftItem()">shift</button>
    <button @click="unshiftItem()">unshift</button>
    <button @click="spliceItem()">splice</button>
    <button @click="sortItem()">sort</button>
    <button @click="reverseItem()">reverse</button>
    <li v-for="(value, key) in user" :key="key">{{key}} - {{value}}</li>
    <li v-for="(value, index) in computedFilterNumbers" :key="index">{{value}}</li>
    <li v-for="(value, index) in methodsFilterNumbers(numbers)" :key="index">{{value}}</li>
  </div>
</template> -->

<template>
  <div>
    <button @click="n += 1">{{n}}</button>
    <button @click="show('buttom - click')">show</button>
    <textarea v-model="textareamsg" placeholder="edit"></textarea>
    <p>textareamsg: {{textareamsg}}</p>
    <input type="text"  v-model="inputmsg" placeholder="edit" />
    <p>inputmsg: {{inputmsg}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '这是一条信息',
      firstName: 'Wang',
      lastName: 'Jun Yan',
      id: 0,
      flag: 'C',
      type: 'true',
      items: [
        'item1',
        'item2'
      ],
      user: {
        id: 0,
        name: 'ybxxszl',
        account: 'admin',
        password: '1234'
      },
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      n: 0,
      textareamsg: '',
      inputmsg: ''
    }
  },
  computed: {
    reversedMessage () {
      return this.message.split('').reverse().join('')
    },
    fullName: {
      get () {
        return this.firstName + ' ' + this.lastName
      },
      set (value) {
        let names = value.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    },
    now () {
      return Date.now()
    },
    computedFilterNumbers () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  },
  methods: {
    pushItem () {
      this.items.push('item - push')
    },
    popItem () {
      this.items.pop()
    },
    shiftItem () {
      let l = this.items.shift()
      console.log(l)
    },
    unshiftItem () {
      let l = this.items.unshift('item - unshift')
      console.log(l)
    },
    spliceItem () {
      // let l = this.items.splice(1, 1)
      let l = this.items.splice(1, 1, 'item - splice')
      console.log(l)
    },
    sortItem () {
      // this.items.sort()
      this.items.sort(this.reverseSortItem)
    },
    reverseItem () {
      this.items.reverse()
    },
    reverseSortItem (a, b) {
      if (a <= b) {
        return true
      } else {
        return false
      }
    },
    methodsFilterNumbers (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0
      })
    },
    changeType () {
      if (this.type) {
        this.type = false
      } else {
        this.type = true
      }
    },
    show (msg) {
      console.log(msg)
    }
  },
  beforeCreate () {
    console.log('1 - beforeCreate')
  },
  created () {
    console.log('2 - created')
  },
  beforeMount () {
    console.log('3 - beforeMount')
  },
  mounted () {
    console.log('4 - mounted')
    console.log(this.methodsFilterNumbers(this.numbers))
    this.show('auto - mounted')
  },
  beforeUpdate () {
    console.log('5 - beforeUpdate')
  },
  updated () {
    console.log('6 - updated')
  },
  activated () {
    console.log('7 - activated')
  },
  deactivated () {
    console.log('8 - deactivated')
  },
  beforeDestroy () {
    console.log('9 - beforeDestroy')
  },
  destroyed () {
    console.log('10 - destroyed')
  },
  errorCaptured () {
    console.log('11 - errorCaptured')
  }
}
</script>

<style>
</style>
