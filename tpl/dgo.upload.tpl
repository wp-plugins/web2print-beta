<link href="{pluginUrl}css/dgo.upload.css" rel="stylesheet" type="text/css"/>
<script src="http://api.delivergo.com/lib.dev/js/swfobject.js" type="text/javascript"></script>
<script type="text/javascript">
	{dgouploadjs}
</script>

<div class="dgo-dialog-form-cover">	
	<div class="directUploadForm is-bottons">
		<input class="translate-title" type="hidden" value="Upload Avatar"/>
		<div class="buttonSimpleUpload is-bottons">
			<input id="buttonSimpleUpload" type="file"/>
			<input id="uploadAvatarId" type="hidden" value="">
			<span>Upload Avatar</span>
		</div>
	</div>
	<div id="MultiUploadForm">
		<input class="pic-message-resolution" type="hidden" value="{PicHasLowResolution}"/>
		<input class="trans-ready-to-upload" type="hidden" value="{Readytoupload}"/>
		<input class="trans-cancel-upload-image" type="hidden" value="{Doyouwanttocanceluploadthisimage}"/>
		<input class="trans-saving" type="hidden" value="{Saving}"/>
		<input class="trans-of" type="hidden" value="{of}"/>
		<input class="trans-upload-complete" type="hidden" value="{UploadComplete}"/>
		<input class="trans-finihed" type="hidden" value="{Finished}"/>
		<input class="trans-seconds" type="hidden" value="{seconds}"/>
		<input class="trans-minutes" type="hidden" value="{minutes}"/>
		<input class="trans-hours" type="hidden" value="{hours}"/>
		<input class="trans-days" type="hidden" value="{days}"/>
		<input class="translate-title" type="hidden" value="{Yourfileswillbetransfered}"/>
		<div class="multi-upload-container">			
			<div id="UploadQueue"></div>
			<div class="multi-upload-footer">
				<div class="m-u-footer1"><span>{Uploadingfile}: </span><span id="uploading-file"></span></div>
				<div class="m-u-footer2"><span>{Remaining}: </span><span id="uploading-remain"></span></div>
				<div class="m-u-footer4"><span>{Speed}: </span><span id="uploading-speed"></span></div>
				<div class="m-u-footer3 is-links" onclick="upload_stop_all()"><span>{StopAll}</span></div>
			</div>
		</div>
	</div>
</div>