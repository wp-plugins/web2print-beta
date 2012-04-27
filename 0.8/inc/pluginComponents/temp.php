<!--<div class="runDiv">
        <p>Run Option</p>
        <select id="motifsel">
            <?php 
                for($i = 1; $i < 100; $i++){
                    echo '<option>'.$i.'</option>';
                }
            ?>
        </select>
        <span>&nbsp;x&nbsp;</span>
        <select id="runSel" onchange="priceChange();">
            <option class="sizeOption">1</option>
            <option class="sizeOption">2</option>
            <option class="sizeOption">10</option>
            <option class="sizeOption">100</option>
            <option class="sizeOption">2000</option>
            <option class="sizeOption">10000</option>
        </select>
        </div>
        
        <div class="productDiv">
        <p>Production Time</p>
        <select id="productSel" style="width: 90%;" onchange="priceChange();">
            <option>Express</option>
            <option>Standard</option>
            <option>Discount</option>
        </select>
        </div>-->
  <script>      
        /*/===========================================================
        //add subpage
        $subPage1 = get_page_by_title('Address Book');
        $subPage2 = get_page_by_title('Account Details');
        $subPage3 = get_page_by_title('Settings Page');
        
        if(!$subPage1){
        //init page
        $subData1['post_title'] = 'Address Book';
        $subData1['post_content'] .= "<div class='address-book-container'></div>";
        $subData1['post_status'] = 'publish';
        $subData1['comment_status'] = 'closed';
        $subData1['ping_status'] = 'closed';
        $subData1['post_type'] = 'page';
        $subData1['post_parent'] = $pageParent->ID;
        
        //insert page
        $subpageID1 = wp_insert_post($subData1); 
        
        //using add_option to mark it
        delete_option('AddressPageID');
        add_option('AddressPageID', $subpageID1);       
        }
           //$subData1['ID'] = $subPage1->ID; 
           //$subpageID1 = wp_update_post($subData1); 
        
        
        if(!$subPage2){
        //init page
        $subData2['post_title'] = 'Account Details';
        $subData2['post_content'] .= "<div class='account-detail-container'></div>";
        $subData2['post_status'] = 'publish';
        $subData2['comment_status'] = 'closed';
        $subData2['ping_status'] = 'closed';
        $subData2['post_type'] = 'page';
        $subData2['post_parent'] = $pageParent->ID;
        
        //insert page
        $subpageID2 = wp_insert_post($subData2);
        
        //using add_option to mark it
        delete_option('AccountPageID');
        add_option('AccountPageID', $subpageID2);
        }
        
        if(!$subPage3){
        //init page
        $subData3['post_title'] = 'Settings Page';
        $subData3['post_content'] .= "<div class='settings-page-container'></div>";
        $subData3['post_status'] = 'publish';
        $subData3['comment_status'] = 'closed';
        $subData3['ping_status'] = 'closed';
        $subData3['post_type'] = 'page';
        $subData3['post_parent'] = $pageParent->ID;
        
        //insert page
        $subpageID3 = wp_insert_post($subData3);
        
        //using add_option to mark it
        delete_option('SettingsPageID');
        add_option('SettingsPageID', $subpageID3);
        }
        //===========================================================*/
   </script>     

//function create Calculator control option
    function createCalculatorControl1(){
        //Get info of changing options
        $data = get_option("changingInfo");
    
        ?>
        <!--Css for admin controls-->
        <link href="<?php echo get_bloginfo('url'); ?>/<?php echo $data['folderCSS']; ?>/admin_option_css.css" rel="stylesheet" type="text/css"/>
        
        <!-- Script and Css for tooltip ... -->
        <!-- Script -->
        <script type="text/javascript">
            var codeIndex = 'DE';
            var nameIndex = 'EUR';
            addLoadEvent(adminOutAPIGet);   
        </script><!-- Get from PHP -->             
        <script type="text/javascript">
            /*Ready function*/
            jQuery(document).ready(function() {
                //call tooltip event
                tooltipEvent();
                                               
                //set the selectedIndex for every Save settings
                jQuery(".adminLanguageSel").attr({selectedIndex: "<?php echo $data['langPosition']; ?>"});
                jQuery(".adminCurrencySel").attr({selectedIndex: "<?php echo $data['curPosition']; ?>"});
                jQuery(".adminTypeSel").attr({selectedIndex: "<?php echo $data['showOnly']; ?>"});
                jQuery(".adminDimensionSel").attr({selectedIndex: "<?php echo $data['dimPosition']; ?>"});  
               
                //set the selectedIndex for every Save settings
                jQuery('.adminTypeSel').attr({selectedIndex: "<?php $i = intval($data['showOnly']) - 1; if($i < 0){$i = 0;}; echo $i; ?>"})           
            });
        </script><!-- admin script -->
        
        <div class="divControl" style="font-size: 12px;">
        <p style="color: #97B1AE;">Settings</p>
        <hr />       

        <!-- First line setting -->
        Preselection<a class="tooltips" href="#"><img class="ui-btn-right" src="../<?php echo $data['folderCSS']; ?>/help.gif"/>
                        <span class="tooltip">
                            Settings<br />
                            1. Language<br />
                            2. Currency<br />
                            3. Dimension<br />
                            4. Show Or Hide
                        </span>
                   </a>
        <label style="margin: 0px 60px;"></label>
        <div align="right" style="float: right;">Show<input id="showOption" name="showOption" type="checkbox" <?php if($data['showOption'] == 'true'){echo 'checked=""';}?> value="<?php if($data['showOption'] == 'true'){echo 'show';}else{ echo 'hide';} ?>"/>
        </div><br /><br /><!-- End first line setting --> 
             
        <p>
            <select style="width: 60px;" name="language" class="lang-sel-widget" title="Language">  
                <?php echo $data['languageOption']; ?>      
            </select>            

            <select style="width: 60px; margin-left: 5px;" name="currency" class="cur-sel-widget" title="Currency"> 
                <?php echo $data['currencyOption']; ?>           
            </select>

            <select style="width: 60px; margin-left: 5px;" name="dimension" class="out-dim-sel" title="Dimension">
            </select>
        </p><!-- End Language | Currency | Dimension dropdownboxes --> 
        <hr /> 
       
        Display all prices<div align="right" style="float: right;"><input id="showAllPrices" name="showAllPrices" type="checkbox" <?php if($data['showAllPrices'] == 'true'){echo 'checked=""';}?> value="<?php if($data['showAllPrices'] == 'true'){echo 'show';}else{ echo 'hide';} ?>"/></div><br /><br />
        Show only
        <select style="width: 100px;" name="adminTypeSel" class="product-sel-widget">
            <?php 
                echo $data['typeOption'];
            ?>
        </select>
        <div align="right" style="float: right;"><input id="showOnly" name="showOnly" type="checkbox" <?php if($data['showOnly'] != '0'){echo 'checked=""';}?>/></div><br />     
        </div><!-- End div control -->
        <!-- Hidden input -->
        <input name="languageOption" class="languageOption" type="hidden" value=""/>
        <input name="currencyOption" class="currencyOption" type="hidden" value=""/> 
        <input name="typeOption" class="typeOption" type="hidden" value=""/> 
        <input name="isSubmited" type="hidden" value="isSubmited"/><!--Avoid mistake between SUBMIT and REFRESH -->      
    <?php  
        //change show hide option
        if(isset($_POST['isSubmited'])){
            if(isset($_POST['showOption'])){
                $data['showOption'] = "true";
            }else{
                $data['showOption'] = "false";
            }
        }        
        
        //change the show all prices option
        if(isset($_POST['isSubmited'])){
            if(isset($_POST['showAllPrices'])){
                $data['showAllPrices'] = "true";
            }else{
                $data['showAllPrices'] = "false";
            }
        }
        
        //change the show only type
        if(isset($_POST['isSubmited'])){
            if(isset($_POST['showOnly'])){
                $data['showOnly'] = preg_replace('/[^a-z0-9]+/i','',$_POST['adminTypeSel']);
            }else{
                $data['showOnly'] = '0';
            }
        }
      
        if(isset($_POST['language'])){    
            //transfer javascript to php 
            if($data['flag'] == '0'){
                //fill to database
                $data['languageOption'] = $_POST['languageOption'];
                $data['currencyOption'] = $_POST['currencyOption']; 
                $data['typeOption'] = $_POST['typeOption'];              
                $data['flag'] = '1';                        
            }           
                
            //Change option setting
            $_POST['language'] = preg_replace('/[^a-z0-9]+/i','',$_POST['language']);
            $_POST['currency'] = preg_replace('/[^a-z0-9]+/i','',$_POST['currency']);
            $_POST['typeOption'] = preg_replace('/[^a-z0-9]+/i','',$_POST['typeOption']);
              
            $data['language'] = substr($_POST['language'],0,2);                
            $data['currency'] = substr($_POST['currency'],0,3);            
  
            $data['langPosition'] = substr($_POST['language'],2,strlen($_POST['language']) - 2);
            $data['curPosition'] = substr($_POST['currency'],3,strlen($_POST['currency']) - 3);
        }
        
    	if(isset($_POST['dimension'])){
                $data['dimension'] = $_POST['dimension'];
                if($_POST['dimension'] == 'mm'){
                    $data['dimPosition'] = '1';
                }else{
                    $data['dimPosition'] = '0';
                }
    	}
    	//update option
        update_option('changingInfo', $data); 
    }
    }

    <!--PHP process data -->
            <?php 
                require_once('inc/fbClass/class.my.template.inc'); 
                require_once('inc/fbClass/home.class.php'); 
                require_once('inc/fbClass/facebook.class.php');
                require_once('inc/fbClass/links.inc.php');
                require_once('inc/fbClass/config.inc.php');
                
                $objFacebook = new FACEBOOK_PHOTO($vt_config);                
                $list_albums = $objFacebook->display_all_albums();

                if($list_albums == ''){
                    $userArr = Array();  
                }else{
                    $userArr = $objFacebook->get_user_info();
                }
                
                $loginBt = $objFacebook->get_login_logout();
            ?>
            <!--End PHP process data -->        
        	<!--Add photo from facebook, flickr, picasa-->
                <!--Using for facebook-->
                <div id="fb-root"></div>
                <script src="http://connect.facebook.net/en_US/all.js"></script>
                <script src="<?php echo linkToPlugin; ?>js/vt_facebook.js" type="text/javascript"></script><!-- dialog function library javascript -->
                <script src="<?php echo linkToPlugin; ?>js/vt_functions.js" type="text/javascript"></script><!-- dialog function library javascript -->
                     <script>
                       FB.init({
                         appId  : 196318157050673,    //159286770790669
                         status : true, // check login status
                         cookie : true, // enable cookies to allow the server to access the session
                         xfbml  : true  // parse XFBML
                       });
                     </script>            
            <!--End add photo from facebook, flickr, picasa-->             
	        <?php
	        ?>
	        
	        
	        <!-- Upload Form -->
    <!--div class="multiUploadForm">
        <div class="title-upload">
            <div class="title-upload-import">
                <div class="first-title"><span>Album: 16</span></div>
                <div class="second-title"><form class="outsite-iframe-form" name="detail-album-form" id="detail-album-form"><input class="count-pictures-input" value="0" name="data" style="width: 30px; text-align: right; border-style: none; background: none; cursor: default;" disabled="disabled"><span> Pictures in album</span></form></div>
                <div class="third-title"><form class="outsite-iframe-form" name="count-form" id="count-form"><span>Pictures selected: </span><input class="count-selected-input" value="0" name="data" style="width: 30px; border-style: none; background: none; cursor: default;" disabled="disabled"></form></div>
            </div>
            <div class="title-upload-upload">
                <div class="first-title"><span>Picture Upload & Import - Picture selected: </span><span>0</span></div>
                <div class="second-title"><span>Product: </span><span>1.000 VisitCards</span></div>    
            </div>
        </div>
        <div class="content-upload">
            <div class="left-content-upload">
                <div class="up-left-content">
                    <div class="left-up-left">
                        <div class="first-left-up"><span>Zoom Slider</span></div>
                        <div class="second-left-up slider-jquery"></div>
                    </div>
                    <div class="right-up-left"></div>
                </div>
                <div class="down-left-content">
                    <div class="list-albums-import">
                        <?php
                            if(isset($_REQUEST['hidListAlbums'])){
                                ?>
                                <script type="text/javascript"></script>
                                <?php
                            }
                                                             
                            if($list_albums == ''){
                                //echo '<div class="facebook-login-import"><span>Login to facebook:</span><br/><br/><fb:login-button id="bottons-facebook" perms="user_photos,friends_photos,user_photo_video_tags,friends_photo_video_tags" onlogin="facebook_events_index_page();">Facebook</fb:login-button></div>';
                            }else{
                                echo $list_albums;
                            } 
                        ?>
                        <script type="text/javascript">
                            jQuery(document).ready(function(){
                                //count the album
                                var albums = 0;
                                jQuery('.down-left-content').find('.import-album-div').each(function(){
                                    albums++;    
                                });
                                
                                //set albums
                                jQuery('.title-upload-import .first-title span').html('Album: ' + albums);
                            });
                        </script>
                    </div>
                </div><!--content include album>
            </div>
            <div class="center-content-upload">
                <div class="center-content-div">
                    <div class="facebook-center-content" style="display: none;">                            
                        <iframe id="album-photo-iframe" src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/inc/fbClass/list_photo_page.php?albumID=none" width="100%" height="100%" frameborder="0">
                        </iframe>
                    </div><!--End content for facebook>
                    <div class="upload-center-content">
                        <div id ="info"></div>
                        <div id="files"></div> 
                        <div id="DropUpload"></div>   
                    </div><!--End content for upload>
                </div>
            </div><!--End of content upload >
            <div class="right-content-upload">
                <div class="up-right-content">
                    <div class="left-up-right"></div>
                    <div class="right-up-right">
                        <div class="first-right-up"><span>Zoom Slider</span></div>
                        <div class="second-right-up slider-jquery"></div>
                    </div>
                </div>
                <div class="down-right-content">
                    <div class="right-bottons is-bottons" id="buttonUpload"><span>Upload Pictures</span></div>
                    <!--div class="right-bottons is-bottons"><span>My Gallery</span></div>
                    <div id="facebook" class="right-bottons is-bottons"><span>Facebook</span></div>
                    <form id="frmFacebookVT" name="frmFacebookVT" method="post" action="">
                        <input type="hidden" name="hidListAlbums" id="hidListAlbums" value="">
                        <input type="hidden" name="hidListAlbumsPages" id="hidListAlbumsPages" value="">
                        <input type="hidden" name="access_token" id="access_token" value="">
                        
                        <input type="hidden" name="previous_access_token" id="previous_access_token" value="">
                        <input type="hidden" name="previous_limit" id="previous_limit" value="">
                        <input type="hidden" name="previous_since" id="previous_since" value="">
                        
                        <input type="hidden" name="next_access_token" id="next_access_token" value="">
                        <input type="hidden" name="next_limit" id="next_limit" value="">
                        <input type="hidden" name="next_until" id="next_until" value="">
                        
                        <input type="hidden" name="account_info" id="account_info" value="">
                        <input type="hidden" name="account_id" id="account_id" value="">
                        <input type="hidden" name="account_name" id="account_name" value="">
                        
                        <input type="hidden" name="account_friends" id="account_friends" value="">
                    </form>
                </div><!--content include buttons>
            </div>
        </div>
        <div class="footer-upload">
            <div class="left-footer-upload">
                <?php
                    if($userArr != NULL){
                        ?>
                            <div class="first-left-footer">
                                <div class="first-left-footer-label"><span>Login: </span></div>
                                <div class="first-left-footer-image"><img width="30px" height="30px" src="http://graph.facebook.com/<?php echo $userArr['accountID']?>/picture"></div>
                            </div>
                            <div class="second-left-footer">
                                <div class="second-left-footer-label"><span><?php echo $userArr['accountName']?></span></div>
                                <div class="second-left-footer-image"></div>
                            </div>                                    
                        <?php
                    }else{
                        ?>
                            <div class="zero-left-footer"><span>Do you have an account of facebook. Click here to login</span></div>
                        <?php
                    }
                ?>                        
                <div class="third-left-footer is-bottons"><?php echo $loginBt; ?></div>
            </div>
            <div class="right-footer-upload"><div class="footer-buttons is-bottons"><span>Shopping Cart</span></div></div>
        </div>                    
    </div-->