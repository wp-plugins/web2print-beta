<?php
	//enum for detaillevels
	class EnumDetailLevel {
		const NoDetails 	= '0';
		const LowDetails 	= '1';
		const ManyDetails 	= '2';
	}
	
	//enum for previewsize
	class EnumPreviewSize {
		const Small 	= 'Small';
		const Medium 	= 'Medium';
		const Large 	= 'Large';
	} 
	
	//enum for sortcriteria
	class EnumSortCriteria {
		const Newest 	= 'Newest';
		const Oldest 	= 'Oldest';
		const TopViewed = 'TopViewed';
		const TopRated 	= 'TopRated';
		const Random 	= 'Random';
	}
	
	//enum for approvalstates
	class EnumApprovalState {
		const All 					 = 'All';
		const Requested 			 = 'Requested';
		const InProgress 			 = 'InProgress';
		const CreatorChangeRequired  = 'CreatorChangeRequired';
		const ProviderChangeRequired = 'ProviderChangeRequired';
		const Declined 				 = 'Declined';
		const Approved 				 = 'Approved';
		const None 					 = 'None';
	}
	
	//enum for modes of categorycontrol
	class CategoryControlMode {
		const Treeview = 'TreeView';
		const Dropdown = 'DropDown';
	}
?>