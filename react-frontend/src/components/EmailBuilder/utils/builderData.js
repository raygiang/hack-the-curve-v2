export const builderData = {
    fields: {
        'heading': {id: 'heading', content: 'New Heading'},
        'paragraph': {id: 'paragraph', content: 'New Paragraph'},
        'image': {id: 'image', content: 'New Image'},
        'video': {id: 'video', content: 'New Video'},
    },
    columns: {
        'email-layout': {
            id: 'email-layout',
            title: 'Email Layout',
            fieldIds: [],
        },
        'fields': {
            id: 'fields',
            title: 'Fields',
            fieldIds: ['heading', 'paragraph', 'image', 'video']
        },
    },
    columnOrder: ['email-layout', 'fields'],
};
