<script type="text/javascript" src="{pluginUrl}/js/dgo.crop.js"></script>
<link href="{pluginUrl}/css/dgo.crop.css" rel="stylesheet" type="text/css"/>
<div class="dgo-dialog-form-cover">
	<div id="mask-crop-form">
		<input class="translate-title" type="hidden" value="{transCropFitpictures}"/>
		<div class="image-crop-content">
			<div class="image-crop-container-border loading">
				<div class="image-crop-container">
					<div class="image-crop-dpi-warning"></div>
					<div class="image-crop-dpi-warning-message"></div>
					<div class="image-crop-left-top"></div>
					<div class="image-crop-right-bottom"></div>
					<div class="image-crop-cut">
					<div class="image-crop-bound" id="image-crop-bound">
							<img id="image-crop-img" class="image-drag-div" src="" alt=""/>
							<div id="ghost-div" class="ghost-div"></div>
					</div>
					<div class="mask-div" id="mask-div"><img src="" alt="" style="display: none"/></div>
					</div>
				</div>
			</div>
			<div class="image-crop-loading"></div>		
			
			<div class="image-crop-tools">
				<div class="crop-quality-div">
					<div class="crop-quality-label"><span>{transQuality}:</span></div>
					<div class="crop-quality-star"><div class="quality-star"></div><div class="quality-star"></div><div class="quality-star"></div><div class="quality-star"></div><div class="quality-star"></div></div>
				</div>
				<div class="crop-slider-div">
					<div class="crop-slider-title"><span>{transZoom}:</span><span id="crop-image-zoom-percent"> 1x</span></div>
					<div class="crop-slider-cover">
						<div id="crop-zoom-slider"></div>
						<div id="crop-zoom-process"></div>
					</div>
				</div>
				<div class="crop-rotate-div">
					
					<div class="crop-rotate-control">
						<div class="crop-rotate-direct crop-rotate-top" onclick="ImageRotateFunc(0);"></div>
						<div class="crop-rotate-direct crop-rotate-left" onclick="ImageRotateFunc(270);"></div>
						<div class="crop-rotate-direct crop-rotate-center"></div>
						<div class="crop-rotate-direct crop-rotate-right" onclick="ImageRotateFunc(90);"></div>
						<div class="crop-rotate-direct crop-rotate-bottom " onclick="ImageRotateFunc(180);"></div>
					</div>
				</div>
				<div class="crop-orientation-div">
					<div class="crop-orientation-title"><span>{transOrientation}</span></div>
					<div class="crop-orientation-content">
						<div id="orientation-landscape" class="orientation-format orientation-landscape">
							<input type="hidden" value="landscape" />
						</div>
						<div id="orientation-portrait" class="orientation-format orientation-portrait">
							<input type="hidden" value="portrait" />
						</div>
					</div>
				</div>
				<div class="crop-mask-div">
					<div class="crop-orientation-title"><span>Cropping Masks</span></div>
					<div id="masks-list">
						<img id="mask-user-chosen" src="">
						<div class="mask-name" title="My albums">Mask Name</div>
						<div id="masks-dropdown" style="display: none;">
							
						</div>
					</div>
				</div>
				<input type="hidden" id="crop-mask-flag" value="orientation" />
			</div>			
			<div class="image-options-div">
				<div class="image-options image-options-delete"><span></span></div>
				<div class="image-options image-options-reset"><span></span></div>
				<div class="image-options image-options-add"><span></span></div>				
			</div>
		</div>			
		<div class="image-crop-footer">
			<div class="image-crop-slider">
				<div class="image-crop-slider-prev" onClick="SliderCropLeftMove()"></div>
				<div class="image-crop-slider-center">
					<div class="image-crop-slider-content"></div>
				</div>
				<div class="image-crop-slider-next" onClick="SliderCropRightMove()"></div>
			</div>
			<div class="image-crop-next-button is-bottons" onclick="DoAllImageCrop();">{transDone}</div>
		</div>
		<div class="crop-overlay-layer" id="crop-overlay-layer"></div>
	</div>
	
	<div id="preview-crop-form">
		<input class="translate-title" type="hidden" value="{transPreview}"/>
		<img id="preview-image" src="" alt=""/>
	</div>
</div>