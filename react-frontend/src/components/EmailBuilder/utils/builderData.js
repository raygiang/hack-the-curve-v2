export const builderData = {
    fields: {
        'heading': {id: 'heading', content: 'New Heading', type: null, "heading-type": 1},
        'paragraph': {id: 'paragraph', content: 'New Paragraph', type: null},
        'image': {id: 'image', content: 'New Image', type: null},
        'video': {id: 'video', content: 'New Video', type: null},
    },
    layouts: {
        'layout': {
            id: 'layout',
            content: 'Click to Select a Layout',
            layout: 0,
            picked: false,
            layouts: {"layout-0": null},
        },
    },
    layoutTypes: {
        0: ["100%"],
        1: ["50%", "50%"],
        2: ["30%", "40%", "30%"],
        3: ["60%", "40%"],
        4: ["40%", "60%"],
    },
    columns: {
        'email-layout': {
            id: 'email-layout',
            title: 'Email Layout',
            fieldIds: ['layout'],
        },
        'fields': {
            id: 'fields',
            title: 'Fields',
            fieldIds: ['heading', 'paragraph', 'image']
        },
    },
    columnOrder: ['email-layout', 'fields'],
};
