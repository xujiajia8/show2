var totalCount = localStorage.getItem('totalmessageCount');
if (totalCount == 0 || totalCount == null || totalCount < 0) {
    $('.message .icon').hide();
} else {
    $('.message .icon').text(totalCount);
};