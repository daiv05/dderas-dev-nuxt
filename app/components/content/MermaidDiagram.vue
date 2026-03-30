<template>
    <VueMermaidRender :content="content" :config="config" ></VueMermaidRender>
</template>
<script setup>
import { VueMermaidRender } from 'vue-mermaid-render'
const props = defineProps({
    content: {
        type: String,
        required: true
    },
    config: {
        type: Object,
        default: () => ({
                theme: 'neutral',
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true
                }
        })
    }
})
</script>