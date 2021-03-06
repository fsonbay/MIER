﻿(function ($) {
    app.modals.CreateOrEditMaterialModal = function () {

        var _materialsService = abp.services.app.materials;

        var _modalManager;
        var _$materialInformationForm = null;

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });

            _$materialInformationForm = _modalManager.getModal().find('form[name=MaterialInformationsForm]');
            _$materialInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$materialInformationForm.valid()) {
                return;
            }

            var material = _$materialInformationForm.serializeFormToObject();
			
			 _modalManager.setBusy(true);
			 _materialsService.createOrEdit(
				material
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditMaterialModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);