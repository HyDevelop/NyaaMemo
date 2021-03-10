<template>
    <div id="hy-input">
        <label>
            <input class="hy-input-inner" :modelValue="modelValue"
                   @input="passInput($event.target.value)"/>
        </label>
    </div>
</template>

<script>
export default {
    name: "HyInput",
    props: {
        modelValue: String
    },
    emits: [
        'update:modelValue',
        'input'
    ],
    methods: {
        passInput(value) {
            this.$emit('input', value)
            this.$emit('update:modelValue', value)
        }
    }
}
</script>

<style lang="sass" scoped>
input
    -webkit-appearance: none
    background-color: white
    background-image: none
    border-radius: 4px
    border: 1px solid #DCDFE6
    -webkit-box-sizing: border-box
    box-sizing: border-box
    color: #606266
    display: inline-block
    height: 40px
    line-height: 40px
    outline: 0
    padding: 0 15px
    width: 100%
</style>
