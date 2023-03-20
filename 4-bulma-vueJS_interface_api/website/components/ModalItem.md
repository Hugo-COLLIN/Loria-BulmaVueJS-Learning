# ModalItem

## Props

<!-- @vuese:ModalItem:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|showModal|determine if the modal is visible or not|`Boolean`|`false`|false|

<!-- @vuese:ModalItem:props:end -->


## Events

<!-- @vuese:ModalItem:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|close|emitted to hide the modal|-|
|edit-data|Reemitted to edit the item| item : the item to edit|
|sent-data|Reemitted to create a new item| item : the item to create|

<!-- @vuese:ModalItem:events:end -->


## Methods

<!-- @vuese:ModalItem:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|closeModal|Close the modal|-|
|resetModal|Reset the modal TODO delete this method|-|
|resetErrors|Reset all errors|-|
|setFieldsDefault|Reset all fields to default values|-|
|cleanFields|Delete all fields|-|
|setFormStruct|--- FORM METHODS CALLS ---Set its structure to the formular component|-|
|setItemAttributes|Set item attributes to the formular component|-|
|newForm|Set the formular component to create a new item|-|
|editForm|Set the formular component to edit an existing item|-|
|editData|--- FORM EMITS REEMITED ---Reemit the edit-data event from the formular component|-|
|sentData|Reemit the sent-data event from the formular component|-|

<!-- @vuese:ModalItem:methods:end -->


