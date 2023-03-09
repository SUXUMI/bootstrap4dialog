Bootstrap4Dialog
================

## Description

Create <a href="https://getbootstrap.com/" target="_blank">Bootstrap 4 / Bootstrap 5</a> Dialog Modals Easily.

[![Latest release](https://img.shields.io/github/release/SUXUMI/bootstrap4dialog.svg)](https://github.com/SUXUMI/bootstrap4dialog/releases/latest)

================

### Installation
``npm i gr-bootstrap4dialog``

### Usage

Simple sample:
```
Bootstrap4Dialog.show({
    title: 'Title'
})
```

Sample without title:
```
Bootstrap4Dialog.show({
    message: 'Message',
    duration: 5
})
```

Sample with multiple options:
```
Bootstrap4Dialog.show({
    title: 'Title', 
    message: 'Message text goes here',
    backdrop: Bootstrap4Dialog.BACKDROP_STATIC,
    type: Bootstrap4Dialog.TYPE_DANGER,
    centered: true,
    scrollable: true,
    duration: 5, // display seconds
    open: function() {
        Bootstrap4Dialog.show({
            title: 'Dialog displayed',
            size: Bootstrap4Dialog.SIZE_SMALL,
            type: Bootstrap4Dialog.TYPE_LIGHT,
            duration: 0.5
        })

        $('#btn-cancel').focus();
    },
    close: function() { 
        Bootstrap4Dialog.show({
            message: 'Dialog closed',
            size: Bootstrap4Dialog.SIZE_SMALL,
            type: Bootstrap4Dialog.TYPE_LIGHT,
            backdrop: Bootstrap4Dialog.BACKDROP_NO,
            duration: 0.5
        }) 
    },
    buttons: [
        {
            id: 'btn-cancel',
            label: 'Cancel',
            cssClass: 'btn btn-light',
            action: function(dialog) {
                dialog.modal('hide');
            }
        }
    ]
})
```

### Warning

For Bootstrap v4 please use release 1.1.0
