<script type="text/javascript">
	{scriptplaceholder}
</script>
<a href="javascript:toggleImagesDiv();">Add pictures</a>
<div id="{imagecontrolsid}wrapper" style="border: 1px solid gray; border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px;">
	<div id="UploadQueue" class="dgo-upload-queue"></div>
	<div id="UploadedFiles" class="dgo-upload-wrapper"></div>
	<div style="display: block">
		<div id="{imagecontrolsid}"	class="dgo-ui-inline">
			<div id="{templatesplaceholderid}" style="display: none;">
				<div id="UploadedFileTemplate" class="dgo-upload-item ui-corner-all">
					<div class="dgo-upload-itemheader" style="display: none">
						<label />
					</div>
					<div class="dgo-upload-itemthumb">
						<img src="" alt="" style="display: none" />
					</div>
					<div class="dgo-upload-itemfooter" style="display: none">
						<label />
					</div>
					<div class="dgo-upload-itemdetails" style="display: none">
						<button id="dgo-upload-processBtn" class="ui-state-default ui-corner-all dgo-ui-button-small dgo-ui-button-icon-solo" title="Bearbeiten">
							<span class="dgo-ui-icon-i dgo-ui-icon-wrench">Bearbeiten</span>
						</button>
						<button id="dgo-upload-placeBtn" class="ui-state-default ui-corner-all dgo-ui-button-small dgo-ui-button-icon-solo" title="Als Hintergrund">
							<span class="dgo-ui-icon-i dgo-ui-icon-background">Als Hintergrund</span>
						</button>
						<button id="dgo-upload-removeBtn" class="ui-state-default ui-corner-all dgo-ui-button-small dgo-ui-button-icon-solo" title="L�schen">
							<span class="dgo-ui-icon-i dgo-ui-icon-remove">L�schen</span>
						</button>
					</div>
				</div>
				<div id="processImageDialog" class="dgo-ui-dialog ui-corner-all" title="Bild nachbearbeiten">
					<div id="actions" class="dgo-ui-actionbar">
						<button id="zoom_in" class="ui-state-default ui-corner-all dgo-ui-button dgo-ui-button-icon-solo" type="submit" title="Vergr��ern">
							<span class="dgo-ui-icon-i dgo-ui-icon-zoom-in">Zoom in</span>
						</button>
						<button id="zoom_out" class="ui-state-default ui-corner-all dgo-ui-button dgo-ui-button-icon-solo" type="submit" title="Verkleinern">
							<span class="dgo-ui-icon-i dgo-ui-icon-zoom-out">Zoom out</span>
						</button>
						<button id="flip_h" class="ui-state-default ui-corner-all dgo-ui-button dgo-ui-button-icon-solo" type="submit" title="Horizontal kippen">
							<span class="dgo-ui-icon-i dgo-ui-icon-flip-h">Flip horizontal</span>
						</button>
						<button id="flip_v" class="ui-state-default ui-corner-all dgo-ui-button dgo-ui-button-icon-solo" type="submit" title="Vertikal kippen">
							<span class="dgo-ui-icon-i dgo-ui-icon-flip-v">Flip vertical</span>
						</button>
						<button id="rotate_l" class="ui-state-default ui-corner-all dgo-ui-button dgo-ui-button-icon-solo" type="submit" title="Links rotieren">
							<span class="dgo-ui-icon-i dgo-ui-icon-rotate-l">Rotate left</span>
						</button>
						<button id="rotate_r" class="ui-state-default ui-corner-all dgo-ui-button dgo-ui-button-icon-solo" type="submit" title="Rechts rotieren">
							<span class="dgo-ui-icon-i dgo-ui-icon-rotate-r">Rotate right</span>
						</button>
					</div>
					<div id="ProcessImageHolder" class="dgo-upload-editimage"></div>
					<div id="dialog-commands" class="dgo-ui-commandbar">
						<div id="dgo-upload-aspect" class="dropdown-menu inlined">
							<div class="content" style="display: none;">
								<ul>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">1</span><span class="text">1:1 (Quadratisch)</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">0.75</span><span class="text">4:3</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">0.666666667</span><span class="text">3:2</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">0.8</span><span class="text">5:4</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value"	style="display: none">0.702702702</span><span class="text">DIN A</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">0.704545454</span><span class="text">DIN B</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">0.5625</span><span class="text">16:9</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">0.625</span><span class="text">16:10</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">-1</span><span class="text">Vorgabe</span>
										</a>
									</li>
									<li>
										<a href="#" class="item">
											<span class="value" style="display: none">0</span><span class="text">Frei</span>
										</a>
									</li>
								</ul>
							</div>
							<span class="dgo-upload-freeaspect"> 
								<input class="dgo-upload-aspect-left" type="text" />:<input class="dgo-upload-aspect-right" type="text" />
								<button id="accept_aspect" class="ui-state-default ui-corner-all dgo-ui-button dgo-ui-button-icon-solo" type="submit" title="Seitenverh�ltnis zuweisen">
									<span class="dgo-ui-icon-i dgo-ui-icon-accept">Seitenverh�ltnis zuweisen</span>
								</button> 
							</span>
						</div>
						<button id="dialog-close" class="ui-state-default ui-corner-all dgo-ui-button simplemodal-close" type="submit">Schlie�en</button>
						<button id="dialog-commit" class="ui-state-default ui-corner-all dgo-ui-button" type="submit">Zuschneiden</button>
					</div>
				</div>
			</div>
			<input type="file" name="uploadify" id="uploadify" />
			<div id="replaceImageDialog" title="Bild austauschen" style="display: none;" class="dgo-ui-dialog-replaceImage">
				<div class="dgo-upload-pop-own-wrap ui-corner-all">
					<span class="label">�bertragene Bilder</span>
					<div class="dgo-upload-pop-own"></div>
				</div>
				<div class="dgo-upload-pop-import-wrap ui-corner-all">
					<span class="label">�bertragen/Importieren</span>
					<div class="dgo-upload-pop-import"></div>
				</div>
			</div>
		</div>
	</div>
</div>