<?php 
	$listPages = array(__('AddressBook', $l10n_prefix), __('AllOrders', $l10n_prefix), __('Activation', $l10n_prefix), __('Archive', $l10n_prefix), __('EarnMoney', $l10n_prefix), __('AccountDetails', $l10n_prefix), __('OrderConfirmation', $l10n_prefix));
	for($i = 0; $i < count($listPages); $i++){
		if($global_current_page == $listPages[$i]){
			?>
				<style type="text/css">
					.metabar{
						display: none !important;
					}
					
					.post-excerpt{
						display: none !important;
					}
				</style>
				﻿﻿<script type="text/javascript">
					jQuery('.post-footer').empty();
				</script>
			<?php
			break;
		}
	}
?>