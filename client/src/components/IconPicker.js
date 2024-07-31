import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";

function getIconFromCode(code) {
  const icon = allMUIIcons.find((icon) => icon.code == code);
  return icon;
}

export default function IconPicker({ icon, onChangeIcon }) {
  const [currentIcon, setCurrentIcon] = React.useState(icon);
  React.useEffect(() => {
    setCurrentIcon(icon);
  }, [icon]);

  return (
    <div>
      <Autocomplete
        id="icon-select"
        sx={{ width: 200 }}
        options={allMUIIcons}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        autoHighlight
        getOptionLabel={(option) => option.code}
        value={getIconFromCode(currentIcon) || getIconFromCode("10k e951")}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option.code}
          >
            <Icon>{option.code}</Icon>
            {option.label}
          </Box>
        )}
        renderInput={(params) => {
          return (
            <TextField
              id="icon-text-field"
              {...params}
              variant="outlined"
              label="Icono"
              placeholder="Select an icon..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <Icon>{currentIcon}</Icon>
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          );
        }}
        onInputChange={(event, value) => {
          setCurrentIcon(value);
          onChangeIcon(value);
        }}
      />
    </div>
  );
}

// Taken from MUI GitHub. This could probably be imported & formatted at run time to reduce maintenance.
// https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints

// Code is a unique key. Some icons have the same label.
const allMUIIcons = [
  {
    label: "10k",
    code: "10k e951",
  },
  {
    label: "10mp",
    code: "10mp e952",
  },
  {
    label: "11mp",
    code: "11mp e953",
  },
  {
    label: "123",
    code: "123 eb8d",
  },
  {
    label: "12mp",
    code: "12mp e954",
  },
  {
    label: "13mp",
    code: "13mp e955",
  },
  {
    label: "14mp",
    code: "14mp e956",
  },
  {
    label: "15mp",
    code: "15mp e957",
  },
  {
    label: "16mp",
    code: "16mp e958",
  },
  {
    label: "17mp",
    code: "17mp e959",
  },
  {
    label: "18_up_rating",
    code: "18_up_rating f8fd",
  },
  {
    label: "18mp",
    code: "18mp e95a",
  },
  {
    label: "19mp",
    code: "19mp e95b",
  },
  {
    label: "1k",
    code: "1k e95c",
  },
  {
    label: "1k_plus",
    code: "1k_plus e95d",
  },
  {
    label: "1x_mobiledata",
    code: "1x_mobiledata efcd",
  },
  {
    label: "20mp",
    code: "20mp e95e",
  },
  {
    label: "21mp",
    code: "21mp e95f",
  },
  {
    label: "22mp",
    code: "22mp e960",
  },
  {
    label: "23mp",
    code: "23mp e961",
  },
  {
    label: "24mp",
    code: "24mp e962",
  },
  {
    label: "2k",
    code: "2k e963",
  },
  {
    label: "2k_plus",
    code: "2k_plus e964",
  },
  {
    label: "2mp",
    code: "2mp e965",
  },
  {
    label: "30fps",
    code: "30fps efce",
  },
  {
    label: "30fps_select",
    code: "30fps_select efcf",
  },
  {
    label: "360",
    code: "360 e577",
  },
  {
    label: "3d_rotation",
    code: "3d_rotation e84d",
  },
  {
    label: "3g_mobiledata",
    code: "3g_mobiledata efd0",
  },
  {
    label: "3k",
    code: "3k e966",
  },
  {
    label: "3k_plus",
    code: "3k_plus e967",
  },
  {
    label: "3mp",
    code: "3mp e968",
  },
  {
    label: "3p",
    code: "3p efd1",
  },
  {
    label: "4g_mobiledata",
    code: "4g_mobiledata efd2",
  },
  {
    label: "4g_plus_mobiledata",
    code: "4g_plus_mobiledata efd3",
  },
  {
    label: "4k",
    code: "4k e072",
  },
  {
    label: "4k_plus",
    code: "4k_plus e969",
  },
  {
    label: "4mp",
    code: "4mp e96a",
  },
  {
    label: "5g",
    code: "5g ef38",
  },
  {
    label: "5k",
    code: "5k e96b",
  },
  {
    label: "5k_plus",
    code: "5k_plus e96c",
  },
  {
    label: "5mp",
    code: "5mp e96d",
  },
  {
    label: "60fps",
    code: "60fps efd4",
  },
  {
    label: "60fps_select",
    code: "60fps_select efd5",
  },
  {
    label: "6_ft_apart",
    code: "6_ft_apart f21e",
  },
  {
    label: "6k",
    code: "6k e96e",
  },
  {
    label: "6k_plus",
    code: "6k_plus e96f",
  },
  {
    label: "6mp",
    code: "6mp e970",
  },
  {
    label: "7k",
    code: "7k e971",
  },
  {
    label: "7k_plus",
    code: "7k_plus e972",
  },
  {
    label: "7mp",
    code: "7mp e973",
  },
  {
    label: "8k",
    code: "8k e974",
  },
  {
    label: "8k_plus",
    code: "8k_plus e975",
  },
  {
    label: "8mp",
    code: "8mp e976",
  },
  {
    label: "9k",
    code: "9k e977",
  },
  {
    label: "9k_plus",
    code: "9k_plus e978",
  },
  {
    label: "9mp",
    code: "9mp e979",
  },
  {
    label: "abc",
    code: "abc eb94",
  },
  {
    label: "ac_unit",
    code: "ac_unit eb3b",
  },
  {
    label: "access_alarm",
    code: "access_alarm e190",
  },
  {
    label: "access_alarms",
    code: "access_alarms e191",
  },
  {
    label: "access_time",
    code: "access_time e192",
  },
  {
    label: "access_time_filled",
    code: "access_time_filled efd6",
  },
  {
    label: "accessibility",
    code: "accessibility e84e",
  },
  {
    label: "accessibility_new",
    code: "accessibility_new e92c",
  },
  {
    label: "accessible",
    code: "accessible e914",
  },
  {
    label: "accessible_forward",
    code: "accessible_forward e934",
  },
  {
    label: "account_balance",
    code: "account_balance e84f",
  },
  {
    label: "account_balance_wallet",
    code: "account_balance_wallet e850",
  },
  {
    label: "account_box",
    code: "account_box e851",
  },
  {
    label: "account_circle",
    code: "account_circle e853",
  },
  {
    label: "account_tree",
    code: "account_tree e97a",
  },
  {
    label: "ad_units",
    code: "ad_units ef39",
  },
  {
    label: "adb",
    code: "adb e60e",
  },
  {
    label: "add",
    code: "add e145",
  },
  {
    label: "add_a_photo",
    code: "add_a_photo e439",
  },
  {
    label: "add_alarm",
    code: "add_alarm e193",
  },
  {
    label: "add_alert",
    code: "add_alert e003",
  },
  {
    label: "add_box",
    code: "add_box e146",
  },
  {
    label: "add_business",
    code: "add_business e729",
  },
  {
    label: "add_call",
    code: "add_call e0e8",
  },
  {
    label: "add_card",
    code: "add_card eb86",
  },
  {
    label: "add_chart",
    code: "add_chart e97b",
  },
  {
    label: "add_circle",
    code: "add_circle e147",
  },
  {
    label: "add_circle_outline",
    code: "add_circle_outline e148",
  },
  {
    label: "add_comment",
    code: "add_comment e266",
  },
  {
    label: "add_home",
    code: "add_home f8eb",
  },
  {
    label: "add_home_work",
    code: "add_home_work f8ed",
  },
  {
    label: "add_ic_call",
    code: "add_ic_call e97c",
  },
  {
    label: "add_link",
    code: "add_link e178",
  },
  {
    label: "add_location",
    code: "add_location e567",
  },
  {
    label: "add_location_alt",
    code: "add_location_alt ef3a",
  },
  {
    label: "add_moderator",
    code: "add_moderator e97d",
  },
  {
    label: "add_photo_alternate",
    code: "add_photo_alternate e43e",
  },
  {
    label: "add_reaction",
    code: "add_reaction e1d3",
  },
  {
    label: "add_road",
    code: "add_road ef3b",
  },
  {
    label: "add_shopping_cart",
    code: "add_shopping_cart e854",
  },
  {
    label: "add_task",
    code: "add_task f23a",
  },
  {
    label: "add_to_drive",
    code: "add_to_drive e65c",
  },
  {
    label: "add_to_home_screen",
    code: "add_to_home_screen e1fe",
  },
  {
    label: "add_to_photos",
    code: "add_to_photos e39d",
  },
  {
    label: "add_to_queue",
    code: "add_to_queue e05c",
  },
  {
    label: "addchart",
    code: "addchart ef3c",
  },
  {
    label: "adf_scanner",
    code: "adf_scanner eada",
  },
  {
    label: "adjust",
    code: "adjust e39e",
  },
  {
    label: "admin_panel_settings",
    code: "admin_panel_settings ef3d",
  },
  {
    label: "adobe",
    code: "adobe ea96",
  },
  {
    label: "ads_click",
    code: "ads_click e762",
  },
  {
    label: "agriculture",
    code: "agriculture ea79",
  },
  {
    label: "air",
    code: "air efd8",
  },
  {
    label: "airline_seat_flat",
    code: "airline_seat_flat e630",
  },
  {
    label: "airline_seat_flat_angled",
    code: "airline_seat_flat_angled e631",
  },
  {
    label: "airline_seat_individual_suite",
    code: "airline_seat_individual_suite e632",
  },
  {
    label: "airline_seat_legroom_extra",
    code: "airline_seat_legroom_extra e633",
  },
  {
    label: "airline_seat_legroom_normal",
    code: "airline_seat_legroom_normal e634",
  },
  {
    label: "airline_seat_legroom_reduced",
    code: "airline_seat_legroom_reduced e635",
  },
  {
    label: "airline_seat_recline_extra",
    code: "airline_seat_recline_extra e636",
  },
  {
    label: "airline_seat_recline_normal",
    code: "airline_seat_recline_normal e637",
  },
  {
    label: "airline_stops",
    code: "airline_stops e7d0",
  },
  {
    label: "airlines",
    code: "airlines e7ca",
  },
  {
    label: "airplane_ticket",
    code: "airplane_ticket efd9",
  },
  {
    label: "airplanemode_active",
    code: "airplanemode_active e195",
  },
  {
    label: "airplanemode_inactive",
    code: "airplanemode_inactive e194",
  },
  {
    label: "airplanemode_off",
    code: "airplanemode_off e194",
  },
  {
    label: "airplanemode_on",
    code: "airplanemode_on e195",
  },
  {
    label: "airplay",
    code: "airplay e055",
  },
  {
    label: "airport_shuttle",
    code: "airport_shuttle eb3c",
  },
  {
    label: "alarm",
    code: "alarm e855",
  },
  {
    label: "alarm_add",
    code: "alarm_add e856",
  },
  {
    label: "alarm_off",
    code: "alarm_off e857",
  },
  {
    label: "alarm_on",
    code: "alarm_on e858",
  },
  {
    label: "album",
    code: "album e019",
  },
  {
    label: "align_horizontal_center",
    code: "align_horizontal_center e00f",
  },
  {
    label: "align_horizontal_left",
    code: "align_horizontal_left e00d",
  },
  {
    label: "align_horizontal_right",
    code: "align_horizontal_right e010",
  },
  {
    label: "align_vertical_bottom",
    code: "align_vertical_bottom e015",
  },
  {
    label: "align_vertical_center",
    code: "align_vertical_center e011",
  },
  {
    label: "align_vertical_top",
    code: "align_vertical_top e00c",
  },
  {
    label: "all_inbox",
    code: "all_inbox e97f",
  },
  {
    label: "all_inclusive",
    code: "all_inclusive eb3d",
  },
  {
    label: "all_out",
    code: "all_out e90b",
  },
  {
    label: "alt_route",
    code: "alt_route f184",
  },
  {
    label: "alternate_email",
    code: "alternate_email e0e6",
  },
  {
    label: "amp_stories",
    code: "amp_stories ea13",
  },
  {
    label: "analytics",
    code: "analytics ef3e",
  },
  {
    label: "anchor",
    code: "anchor f1cd",
  },
  {
    label: "android",
    code: "android e859",
  },
  {
    label: "animation",
    code: "animation e71c",
  },
  {
    label: "announcement",
    code: "announcement e85a",
  },
  {
    label: "aod",
    code: "aod efda",
  },
  {
    label: "apartment",
    code: "apartment ea40",
  },
  {
    label: "api",
    code: "api f1b7",
  },
  {
    label: "app_blocking",
    code: "app_blocking ef3f",
  },
  {
    label: "app_registration",
    code: "app_registration ef40",
  },
  {
    label: "app_settings_alt",
    code: "app_settings_alt ef41",
  },
  {
    label: "app_shortcut",
    code: "app_shortcut eae4",
  },
  {
    label: "apple",
    code: "apple ea80",
  },
  {
    label: "approval",
    code: "approval e982",
  },
  {
    label: "apps",
    code: "apps e5c3",
  },
  {
    label: "apps_outage",
    code: "apps_outage e7cc",
  },
  {
    label: "architecture",
    code: "architecture ea3b",
  },
  {
    label: "archive",
    code: "archive e149",
  },
  {
    label: "area_chart",
    code: "area_chart e770",
  },
  {
    label: "arrow_back",
    code: "arrow_back e5c4",
  },
  {
    label: "arrow_back_ios",
    code: "arrow_back_ios e5e0",
  },
  {
    label: "arrow_back_ios_new",
    code: "arrow_back_ios_new e2ea",
  },
  {
    label: "arrow_circle_down",
    code: "arrow_circle_down f181",
  },
  {
    label: "arrow_circle_left",
    code: "arrow_circle_left eaa7",
  },
  {
    label: "arrow_circle_right",
    code: "arrow_circle_right eaaa",
  },
  {
    label: "arrow_circle_up",
    code: "arrow_circle_up f182",
  },
  {
    label: "arrow_downward",
    code: "arrow_downward e5db",
  },
  {
    label: "arrow_drop_down",
    code: "arrow_drop_down e5c5",
  },
  {
    label: "arrow_drop_down_circle",
    code: "arrow_drop_down_circle e5c6",
  },
  {
    label: "arrow_drop_up",
    code: "arrow_drop_up e5c7",
  },
  {
    label: "arrow_forward",
    code: "arrow_forward e5c8",
  },
  {
    label: "arrow_forward_ios",
    code: "arrow_forward_ios e5e1",
  },
  {
    label: "arrow_left",
    code: "arrow_left e5de",
  },
  {
    label: "arrow_outward",
    code: "arrow_outward f8ce",
  },
  {
    label: "arrow_right",
    code: "arrow_right e5df",
  },
  {
    label: "arrow_right_alt",
    code: "arrow_right_alt e941",
  },
  {
    label: "arrow_upward",
    code: "arrow_upward e5d8",
  },
  {
    label: "art_track",
    code: "art_track e060",
  },
  {
    label: "article",
    code: "article ef42",
  },
  {
    label: "aspect_ratio",
    code: "aspect_ratio e85b",
  },
  {
    label: "assessment",
    code: "assessment e85c",
  },
  {
    label: "assignment",
    code: "assignment e85d",
  },
  {
    label: "assignment_add",
    code: "assignment_add f848",
  },
  {
    label: "assignment_ind",
    code: "assignment_ind e85e",
  },
  {
    label: "assignment_late",
    code: "assignment_late e85f",
  },
  {
    label: "assignment_return",
    code: "assignment_return e860",
  },
  {
    label: "assignment_returned",
    code: "assignment_returned e861",
  },
  {
    label: "assignment_turned_in",
    code: "assignment_turned_in e862",
  },
  {
    label: "assist_walker",
    code: "assist_walker f8d5",
  },
  {
    label: "assistant",
    code: "assistant e39f",
  },
  {
    label: "assistant_direction",
    code: "assistant_direction e988",
  },
  {
    label: "assistant_navigation",
    code: "assistant_navigation e989",
  },
  {
    label: "assistant_photo",
    code: "assistant_photo e3a0",
  },
  {
    label: "assured_workload",
    code: "assured_workload eb6f",
  },
  {
    label: "atm",
    code: "atm e573",
  },
  {
    label: "attach_email",
    code: "attach_email ea5e",
  },
  {
    label: "attach_file",
    code: "attach_file e226",
  },
  {
    label: "attach_money",
    code: "attach_money e227",
  },
  {
    label: "attachment",
    code: "attachment e2bc",
  },
  {
    label: "attractions",
    code: "attractions ea52",
  },
  {
    label: "attribution",
    code: "attribution efdb",
  },
  {
    label: "audio_file",
    code: "audio_file eb82",
  },
  {
    label: "audiotrack",
    code: "audiotrack e3a1",
  },
  {
    label: "auto_awesome",
    code: "auto_awesome e65f",
  },
  {
    label: "auto_awesome_mosaic",
    code: "auto_awesome_mosaic e660",
  },
  {
    label: "auto_awesome_motion",
    code: "auto_awesome_motion e661",
  },
  {
    label: "auto_delete",
    code: "auto_delete ea4c",
  },
  {
    label: "auto_fix_high",
    code: "auto_fix_high e663",
  },
  {
    label: "auto_fix_normal",
    code: "auto_fix_normal e664",
  },
  {
    label: "auto_fix_off",
    code: "auto_fix_off e665",
  },
  {
    label: "auto_graph",
    code: "auto_graph e4fb",
  },
  {
    label: "auto_mode",
    code: "auto_mode ec20",
  },
  {
    label: "auto_stories",
    code: "auto_stories e666",
  },
  {
    label: "autofps_select",
    code: "autofps_select efdc",
  },
  {
    label: "autorenew",
    code: "autorenew e863",
  },
  {
    label: "av_timer",
    code: "av_timer e01b",
  },
  {
    label: "baby_changing_station",
    code: "baby_changing_station f19b",
  },
  {
    label: "back_hand",
    code: "back_hand e764",
  },
  {
    label: "backpack",
    code: "backpack f19c",
  },
  {
    label: "backspace",
    code: "backspace e14a",
  },
  {
    label: "backup",
    code: "backup e864",
  },
  {
    label: "backup_table",
    code: "backup_table ef43",
  },
  {
    label: "badge",
    code: "badge ea67",
  },
  {
    label: "bakery_dining",
    code: "bakery_dining ea53",
  },
  {
    label: "balance",
    code: "balance eaf6",
  },
  {
    label: "balcony",
    code: "balcony e58f",
  },
  {
    label: "ballot",
    code: "ballot e172",
  },
  {
    label: "bar_chart",
    code: "bar_chart e26b",
  },
  {
    label: "barcode_reader",
    code: "barcode_reader f85c",
  },
  {
    label: "batch_prediction",
    code: "batch_prediction f0f5",
  },
  {
    label: "bathroom",
    code: "bathroom efdd",
  },
  {
    label: "bathtub",
    code: "bathtub ea41",
  },
  {
    label: "battery_0_bar",
    code: "battery_0_bar ebdc",
  },
  {
    label: "battery_1_bar",
    code: "battery_1_bar ebd9",
  },
  {
    label: "battery_2_bar",
    code: "battery_2_bar ebe0",
  },
  {
    label: "battery_3_bar",
    code: "battery_3_bar ebdd",
  },
  {
    label: "battery_4_bar",
    code: "battery_4_bar ebe2",
  },
  {
    label: "battery_5_bar",
    code: "battery_5_bar ebd4",
  },
  {
    label: "battery_6_bar",
    code: "battery_6_bar ebd2",
  },
  {
    label: "battery_alert",
    code: "battery_alert e19c",
  },
  {
    label: "battery_charging_full",
    code: "battery_charging_full e1a3",
  },
  {
    label: "battery_full",
    code: "battery_full e1a4",
  },
  {
    label: "battery_saver",
    code: "battery_saver efde",
  },
  {
    label: "battery_std",
    code: "battery_std e1a5",
  },
  {
    label: "battery_unknown",
    code: "battery_unknown e1a6",
  },
  {
    label: "beach_access",
    code: "beach_access eb3e",
  },
  {
    label: "bed",
    code: "bed efdf",
  },
  {
    label: "bedroom_baby",
    code: "bedroom_baby efe0",
  },
  {
    label: "bedroom_child",
    code: "bedroom_child efe1",
  },
  {
    label: "bedroom_parent",
    code: "bedroom_parent efe2",
  },
  {
    label: "bedtime",
    code: "bedtime ef44",
  },
  {
    label: "bedtime_off",
    code: "bedtime_off eb76",
  },
  {
    label: "beenhere",
    code: "beenhere e52d",
  },
  {
    label: "bento",
    code: "bento f1f4",
  },
  {
    label: "bike_scooter",
    code: "bike_scooter ef45",
  },
  {
    label: "biotech",
    code: "biotech ea3a",
  },
  {
    label: "blender",
    code: "blender efe3",
  },
  {
    label: "blind",
    code: "blind f8d6",
  },
  {
    label: "blinds",
    code: "blinds e286",
  },
  {
    label: "blinds_closed",
    code: "blinds_closed ec1f",
  },
  {
    label: "block",
    code: "block e14b",
  },
  {
    label: "block_flipped",
    code: "block_flipped ef46",
  },
  {
    label: "bloodtype",
    code: "bloodtype efe4",
  },
  {
    label: "bluetooth",
    code: "bluetooth e1a7",
  },
  {
    label: "bluetooth_audio",
    code: "bluetooth_audio e60f",
  },
  {
    label: "bluetooth_connected",
    code: "bluetooth_connected e1a8",
  },
  {
    label: "bluetooth_disabled",
    code: "bluetooth_disabled e1a9",
  },
  {
    label: "bluetooth_drive",
    code: "bluetooth_drive efe5",
  },
  {
    label: "bluetooth_searching",
    code: "bluetooth_searching e1aa",
  },
  {
    label: "blur_circular",
    code: "blur_circular e3a2",
  },
  {
    label: "blur_linear",
    code: "blur_linear e3a3",
  },
  {
    label: "blur_off",
    code: "blur_off e3a4",
  },
  {
    label: "blur_on",
    code: "blur_on e3a5",
  },
  {
    label: "bolt",
    code: "bolt ea0b",
  },
  {
    label: "book",
    code: "book e865",
  },
  {
    label: "book_online",
    code: "book_online f217",
  },
  {
    label: "bookmark",
    code: "bookmark e866",
  },
  {
    label: "bookmark_add",
    code: "bookmark_add e598",
  },
  {
    label: "bookmark_added",
    code: "bookmark_added e599",
  },
  {
    label: "bookmark_border",
    code: "bookmark_border e867",
  },
  {
    label: "bookmark_outline",
    code: "bookmark_outline e867",
  },
  {
    label: "bookmark_remove",
    code: "bookmark_remove e59a",
  },
  {
    label: "bookmarks",
    code: "bookmarks e98b",
  },
  {
    label: "border_all",
    code: "border_all e228",
  },
  {
    label: "border_bottom",
    code: "border_bottom e229",
  },
  {
    label: "border_clear",
    code: "border_clear e22a",
  },
  {
    label: "border_color",
    code: "border_color e22b",
  },
  {
    label: "border_horizontal",
    code: "border_horizontal e22c",
  },
  {
    label: "border_inner",
    code: "border_inner e22d",
  },
  {
    label: "border_left",
    code: "border_left e22e",
  },
  {
    label: "border_outer",
    code: "border_outer e22f",
  },
  {
    label: "border_right",
    code: "border_right e230",
  },
  {
    label: "border_style",
    code: "border_style e231",
  },
  {
    label: "border_top",
    code: "border_top e232",
  },
  {
    label: "border_vertical",
    code: "border_vertical e233",
  },
  {
    label: "boy",
    code: "boy eb67",
  },
  {
    label: "branding_watermark",
    code: "branding_watermark e06b",
  },
  {
    label: "breakfast_dining",
    code: "breakfast_dining ea54",
  },
  {
    label: "brightness_1",
    code: "brightness_1 e3a6",
  },
  {
    label: "brightness_2",
    code: "brightness_2 e3a7",
  },
  {
    label: "brightness_3",
    code: "brightness_3 e3a8",
  },
  {
    label: "brightness_4",
    code: "brightness_4 e3a9",
  },
  {
    label: "brightness_5",
    code: "brightness_5 e3aa",
  },
  {
    label: "brightness_6",
    code: "brightness_6 e3ab",
  },
  {
    label: "brightness_7",
    code: "brightness_7 e3ac",
  },
  {
    label: "brightness_auto",
    code: "brightness_auto e1ab",
  },
  {
    label: "brightness_high",
    code: "brightness_high e1ac",
  },
  {
    label: "brightness_low",
    code: "brightness_low e1ad",
  },
  {
    label: "brightness_medium",
    code: "brightness_medium e1ae",
  },
  {
    label: "broadcast_on_home",
    code: "broadcast_on_home f8f8",
  },
  {
    label: "broadcast_on_personal",
    code: "broadcast_on_personal f8f9",
  },
  {
    label: "broken_image",
    code: "broken_image e3ad",
  },
  {
    label: "browse_gallery",
    code: "browse_gallery ebd1",
  },
  {
    label: "browser_not_supported",
    code: "browser_not_supported ef47",
  },
  {
    label: "browser_updated",
    code: "browser_updated e7cf",
  },
  {
    label: "brunch_dining",
    code: "brunch_dining ea73",
  },
  {
    label: "brush",
    code: "brush e3ae",
  },
  {
    label: "bubble_chart",
    code: "bubble_chart e6dd",
  },
  {
    label: "bug_report",
    code: "bug_report e868",
  },
  {
    label: "build",
    code: "build e869",
  },
  {
    label: "build_circle",
    code: "build_circle ef48",
  },
  {
    label: "bungalow",
    code: "bungalow e591",
  },
  {
    label: "burst_mode",
    code: "burst_mode e43c",
  },
  {
    label: "bus_alert",
    code: "bus_alert e98f",
  },
  {
    label: "business",
    code: "business e0af",
  },
  {
    label: "business_center",
    code: "business_center eb3f",
  },
  {
    label: "cabin",
    code: "cabin e589",
  },
  {
    label: "cable",
    code: "cable efe6",
  },
  {
    label: "cached",
    code: "cached e86a",
  },
  {
    label: "cake",
    code: "cake e7e9",
  },
  {
    label: "calculate",
    code: "calculate ea5f",
  },
  {
    label: "calendar_month",
    code: "calendar_month ebcc",
  },
  {
    label: "calendar_today",
    code: "calendar_today e935",
  },
  {
    label: "calendar_view_day",
    code: "calendar_view_day e936",
  },
  {
    label: "calendar_view_month",
    code: "calendar_view_month efe7",
  },
  {
    label: "calendar_view_week",
    code: "calendar_view_week efe8",
  },
  {
    label: "call",
    code: "call e0b0",
  },
  {
    label: "call_end",
    code: "call_end e0b1",
  },
  {
    label: "call_made",
    code: "call_made e0b2",
  },
  {
    label: "call_merge",
    code: "call_merge e0b3",
  },
  {
    label: "call_missed",
    code: "call_missed e0b4",
  },
  {
    label: "call_missed_outgoing",
    code: "call_missed_outgoing e0e4",
  },
  {
    label: "call_received",
    code: "call_received e0b5",
  },
  {
    label: "call_split",
    code: "call_split e0b6",
  },
  {
    label: "call_to_action",
    code: "call_to_action e06c",
  },
  {
    label: "camera",
    code: "camera e3af",
  },
  {
    label: "camera_alt",
    code: "camera_alt e3b0",
  },
  {
    label: "camera_enhance",
    code: "camera_enhance e8fc",
  },
  {
    label: "camera_front",
    code: "camera_front e3b1",
  },
  {
    label: "camera_indoor",
    code: "camera_indoor efe9",
  },
  {
    label: "camera_outdoor",
    code: "camera_outdoor efea",
  },
  {
    label: "camera_rear",
    code: "camera_rear e3b2",
  },
  {
    label: "camera_roll",
    code: "camera_roll e3b3",
  },
  {
    label: "cameraswitch",
    code: "cameraswitch efeb",
  },
  {
    label: "campaign",
    code: "campaign ef49",
  },
  {
    label: "cancel",
    code: "cancel e5c9",
  },
  {
    label: "cancel_presentation",
    code: "cancel_presentation e0e9",
  },
  {
    label: "cancel_schedule_send",
    code: "cancel_schedule_send ea39",
  },
  {
    label: "candlestick_chart",
    code: "candlestick_chart ead4",
  },
  {
    label: "car_crash",
    code: "car_crash ebf2",
  },
  {
    label: "car_rental",
    code: "car_rental ea55",
  },
  {
    label: "car_repair",
    code: "car_repair ea56",
  },
  {
    label: "card_giftcard",
    code: "card_giftcard e8f6",
  },
  {
    label: "card_membership",
    code: "card_membership e8f7",
  },
  {
    label: "card_travel",
    code: "card_travel e8f8",
  },
  {
    label: "carpenter",
    code: "carpenter f1f8",
  },
  {
    label: "cases",
    code: "cases e992",
  },
  {
    label: "casino",
    code: "casino eb40",
  },
  {
    label: "cast",
    code: "cast e307",
  },
  {
    label: "cast_connected",
    code: "cast_connected e308",
  },
  {
    label: "cast_for_education",
    code: "cast_for_education efec",
  },
  {
    label: "castle",
    code: "castle eab1",
  },
  {
    label: "catching_pokemon",
    code: "catching_pokemon e508",
  },
  {
    label: "category",
    code: "category e574",
  },
  {
    label: "celebration",
    code: "celebration ea65",
  },
  {
    label: "cell_tower",
    code: "cell_tower ebba",
  },
  {
    label: "cell_wifi",
    code: "cell_wifi e0ec",
  },
  {
    label: "center_focus_strong",
    code: "center_focus_strong e3b4",
  },
  {
    label: "center_focus_weak",
    code: "center_focus_weak e3b5",
  },
  {
    label: "chair",
    code: "chair efed",
  },
  {
    label: "chair_alt",
    code: "chair_alt efee",
  },
  {
    label: "chalet",
    code: "chalet e585",
  },
  {
    label: "change_circle",
    code: "change_circle e2e7",
  },
  {
    label: "change_history",
    code: "change_history e86b",
  },
  {
    label: "charging_station",
    code: "charging_station f19d",
  },
  {
    label: "chat",
    code: "chat e0b7",
  },
  {
    label: "chat_bubble",
    code: "chat_bubble e0ca",
  },
  {
    label: "chat_bubble_outline",
    code: "chat_bubble_outline e0cb",
  },
  {
    label: "check",
    code: "check e5ca",
  },
  {
    label: "check_box",
    code: "check_box e834",
  },
  {
    label: "check_box_outline_blank",
    code: "check_box_outline_blank e835",
  },
  {
    label: "check_circle",
    code: "check_circle e86c",
  },
  {
    label: "check_circle_outline",
    code: "check_circle_outline e92d",
  },
  {
    label: "checklist",
    code: "checklist e6b1",
  },
  {
    label: "checklist_rtl",
    code: "checklist_rtl e6b3",
  },
  {
    label: "checkroom",
    code: "checkroom f19e",
  },
  {
    label: "chevron_left",
    code: "chevron_left e5cb",
  },
  {
    label: "chevron_right",
    code: "chevron_right e5cc",
  },
  {
    label: "child_care",
    code: "child_care eb41",
  },
  {
    label: "child_friendly",
    code: "child_friendly eb42",
  },
  {
    label: "chrome_reader_mode",
    code: "chrome_reader_mode e86d",
  },
  {
    label: "church",
    code: "church eaae",
  },
  {
    label: "circle",
    code: "circle ef4a",
  },
  {
    label: "circle_notifications",
    code: "circle_notifications e994",
  },
  {
    label: "class",
    code: "class e86e",
  },
  {
    label: "clean_hands",
    code: "clean_hands f21f",
  },
  {
    label: "cleaning_services",
    code: "cleaning_services f0ff",
  },
  {
    label: "clear",
    code: "clear e14c",
  },
  {
    label: "clear_all",
    code: "clear_all e0b8",
  },
  {
    label: "close",
    code: "close e5cd",
  },
  {
    label: "close_fullscreen",
    code: "close_fullscreen f1cf",
  },
  {
    label: "closed_caption",
    code: "closed_caption e01c",
  },
  {
    label: "closed_caption_disabled",
    code: "closed_caption_disabled f1dc",
  },
  {
    label: "closed_caption_off",
    code: "closed_caption_off e996",
  },
  {
    label: "cloud",
    code: "cloud e2bd",
  },
  {
    label: "cloud_circle",
    code: "cloud_circle e2be",
  },
  {
    label: "cloud_done",
    code: "cloud_done e2bf",
  },
  {
    label: "cloud_download",
    code: "cloud_download e2c0",
  },
  {
    label: "cloud_off",
    code: "cloud_off e2c1",
  },
  {
    label: "cloud_queue",
    code: "cloud_queue e2c2",
  },
  {
    label: "cloud_sync",
    code: "cloud_sync eb5a",
  },
  {
    label: "cloud_upload",
    code: "cloud_upload e2c3",
  },
  {
    label: "cloudy_snowing",
    code: "cloudy_snowing e810",
  },
  {
    label: "co2",
    code: "co2 e7b0",
  },
  {
    label: "co_present",
    code: "co_present eaf0",
  },
  {
    label: "code",
    code: "code e86f",
  },
  {
    label: "code_off",
    code: "code_off e4f3",
  },
  {
    label: "coffee",
    code: "coffee efef",
  },
  {
    label: "coffee_maker",
    code: "coffee_maker eff0",
  },
  {
    label: "collections",
    code: "collections e3b6",
  },
  {
    label: "collections_bookmark",
    code: "collections_bookmark e431",
  },
  {
    label: "color_lens",
    code: "color_lens e3b7",
  },
  {
    label: "colorize",
    code: "colorize e3b8",
  },
  {
    label: "comment",
    code: "comment e0b9",
  },
  {
    label: "comment_bank",
    code: "comment_bank ea4e",
  },
  {
    label: "comments_disabled",
    code: "comments_disabled e7a2",
  },
  {
    label: "commit",
    code: "commit eaf5",
  },
  {
    label: "commute",
    code: "commute e940",
  },
  {
    label: "compare",
    code: "compare e3b9",
  },
  {
    label: "compare_arrows",
    code: "compare_arrows e915",
  },
  {
    label: "compass_calibration",
    code: "compass_calibration e57c",
  },
  {
    label: "compost",
    code: "compost e761",
  },
  {
    label: "compress",
    code: "compress e94d",
  },
  {
    label: "computer",
    code: "computer e30a",
  },
  {
    label: "confirmation_num",
    code: "confirmation_num e638",
  },
  {
    label: "confirmation_number",
    code: "confirmation_number e638",
  },
  {
    label: "connect_without_contact",
    code: "connect_without_contact f223",
  },
  {
    label: "connected_tv",
    code: "connected_tv e998",
  },
  {
    label: "connecting_airports",
    code: "connecting_airports e7c9",
  },
  {
    label: "construction",
    code: "construction ea3c",
  },
  {
    label: "contact_emergency",
    code: "contact_emergency f8d1",
  },
  {
    label: "contact_mail",
    code: "contact_mail e0d0",
  },
  {
    label: "contact_page",
    code: "contact_page f22e",
  },
  {
    label: "contact_phone",
    code: "contact_phone e0cf",
  },
  {
    label: "contact_support",
    code: "contact_support e94c",
  },
  {
    label: "contactless",
    code: "contactless ea71",
  },
  {
    label: "contacts",
    code: "contacts e0ba",
  },
  {
    label: "content_copy",
    code: "content_copy e14d",
  },
  {
    label: "content_cut",
    code: "content_cut e14e",
  },
  {
    label: "content_paste",
    code: "content_paste e14f",
  },
  {
    label: "content_paste_go",
    code: "content_paste_go ea8e",
  },
  {
    label: "content_paste_off",
    code: "content_paste_off e4f8",
  },
  {
    label: "content_paste_search",
    code: "content_paste_search ea9b",
  },
  {
    label: "contrast",
    code: "contrast eb37",
  },
  {
    label: "control_camera",
    code: "control_camera e074",
  },
  {
    label: "control_point",
    code: "control_point e3ba",
  },
  {
    label: "control_point_duplicate",
    code: "control_point_duplicate e3bb",
  },
  {
    label: "conveyor_belt",
    code: "conveyor_belt f867",
  },
  {
    label: "cookie",
    code: "cookie eaac",
  },
  {
    label: "copy_all",
    code: "copy_all e2ec",
  },
  {
    label: "copyright",
    code: "copyright e90c",
  },
  {
    label: "coronavirus",
    code: "coronavirus f221",
  },
  {
    label: "corporate_fare",
    code: "corporate_fare f1d0",
  },
  {
    label: "cottage",
    code: "cottage e587",
  },
  {
    label: "countertops",
    code: "countertops f1f7",
  },
  {
    label: "create",
    code: "create e150",
  },
  {
    label: "create_new_folder",
    code: "create_new_folder e2cc",
  },
  {
    label: "credit_card",
    code: "credit_card e870",
  },
  {
    label: "credit_card_off",
    code: "credit_card_off e4f4",
  },
  {
    label: "credit_score",
    code: "credit_score eff1",
  },
  {
    label: "crib",
    code: "crib e588",
  },
  {
    label: "crisis_alert",
    code: "crisis_alert ebe9",
  },
  {
    label: "crop",
    code: "crop e3be",
  },
  {
    label: "crop_16_9",
    code: "crop_16_9 e3bc",
  },
  {
    label: "crop_3_2",
    code: "crop_3_2 e3bd",
  },
  {
    label: "crop_5_4",
    code: "crop_5_4 e3bf",
  },
  {
    label: "crop_7_5",
    code: "crop_7_5 e3c0",
  },
  {
    label: "crop_din",
    code: "crop_din e3c1",
  },
  {
    label: "crop_free",
    code: "crop_free e3c2",
  },
  {
    label: "crop_landscape",
    code: "crop_landscape e3c3",
  },
  {
    label: "crop_original",
    code: "crop_original e3c4",
  },
  {
    label: "crop_portrait",
    code: "crop_portrait e3c5",
  },
  {
    label: "crop_rotate",
    code: "crop_rotate e437",
  },
  {
    label: "crop_square",
    code: "crop_square e3c6",
  },
  {
    label: "cruelty_free",
    code: "cruelty_free e799",
  },
  {
    label: "css",
    code: "css eb93",
  },
  {
    label: "currency_bitcoin",
    code: "currency_bitcoin ebc5",
  },
  {
    label: "currency_exchange",
    code: "currency_exchange eb70",
  },
  {
    label: "currency_franc",
    code: "currency_franc eafa",
  },
  {
    label: "currency_lira",
    code: "currency_lira eaef",
  },
  {
    label: "currency_pound",
    code: "currency_pound eaf1",
  },
  {
    label: "currency_ruble",
    code: "currency_ruble eaec",
  },
  {
    label: "currency_rupee",
    code: "currency_rupee eaf7",
  },
  {
    label: "currency_yen",
    code: "currency_yen eafb",
  },
  {
    label: "currency_yuan",
    code: "currency_yuan eaf9",
  },
  {
    label: "curtains",
    code: "curtains ec1e",
  },
  {
    label: "curtains_closed",
    code: "curtains_closed ec1d",
  },
  {
    label: "cyclone",
    code: "cyclone ebd5",
  },
  {
    label: "dangerous",
    code: "dangerous e99a",
  },
  {
    label: "dark_mode",
    code: "dark_mode e51c",
  },
  {
    label: "dashboard",
    code: "dashboard e871",
  },
  {
    label: "dashboard_customize",
    code: "dashboard_customize e99b",
  },
  {
    label: "data_array",
    code: "data_array ead1",
  },
  {
    label: "data_exploration",
    code: "data_exploration e76f",
  },
  {
    label: "data_object",
    code: "data_object ead3",
  },
  {
    label: "data_saver_off",
    code: "data_saver_off eff2",
  },
  {
    label: "data_saver_on",
    code: "data_saver_on eff3",
  },
  {
    label: "data_thresholding",
    code: "data_thresholding eb9f",
  },
  {
    label: "data_usage",
    code: "data_usage e1af",
  },
  {
    label: "dataset",
    code: "dataset f8ee",
  },
  {
    label: "dataset_linked",
    code: "dataset_linked f8ef",
  },
  {
    label: "date_range",
    code: "date_range e916",
  },
  {
    label: "deblur",
    code: "deblur eb77",
  },
  {
    label: "deck",
    code: "deck ea42",
  },
  {
    label: "dehaze",
    code: "dehaze e3c7",
  },
  {
    label: "delete",
    code: "delete e872",
  },
  {
    label: "delete_forever",
    code: "delete_forever e92b",
  },
  {
    label: "delete_outline",
    code: "delete_outline e92e",
  },
  {
    label: "delete_sweep",
    code: "delete_sweep e16c",
  },
  {
    label: "delivery_dining",
    code: "delivery_dining ea72",
  },
  {
    label: "density_large",
    code: "density_large eba9",
  },
  {
    label: "density_medium",
    code: "density_medium eb9e",
  },
  {
    label: "density_small",
    code: "density_small eba8",
  },
  {
    label: "departure_board",
    code: "departure_board e576",
  },
  {
    label: "description",
    code: "description e873",
  },
  {
    label: "deselect",
    code: "deselect ebb6",
  },
  {
    label: "design_services",
    code: "design_services f10a",
  },
  {
    label: "desk",
    code: "desk f8f4",
  },
  {
    label: "desktop_access_disabled",
    code: "desktop_access_disabled e99d",
  },
  {
    label: "desktop_mac",
    code: "desktop_mac e30b",
  },
  {
    label: "desktop_windows",
    code: "desktop_windows e30c",
  },
  {
    label: "details",
    code: "details e3c8",
  },
  {
    label: "developer_board",
    code: "developer_board e30d",
  },
  {
    label: "developer_board_off",
    code: "developer_board_off e4ff",
  },
  {
    label: "developer_mode",
    code: "developer_mode e1b0",
  },
  {
    label: "device_hub",
    code: "device_hub e335",
  },
  {
    label: "device_thermostat",
    code: "device_thermostat e1ff",
  },
  {
    label: "device_unknown",
    code: "device_unknown e339",
  },
  {
    label: "devices",
    code: "devices e1b1",
  },
  {
    label: "devices_fold",
    code: "devices_fold ebde",
  },
  {
    label: "devices_other",
    code: "devices_other e337",
  },
  {
    label: "dew_point",
    code: "dew_point f879",
  },
  {
    label: "dialer_sip",
    code: "dialer_sip e0bb",
  },
  {
    label: "dialpad",
    code: "dialpad e0bc",
  },
  {
    label: "diamond",
    code: "diamond ead5",
  },
  {
    label: "difference",
    code: "difference eb7d",
  },
  {
    label: "dining",
    code: "dining eff4",
  },
  {
    label: "dinner_dining",
    code: "dinner_dining ea57",
  },
  {
    label: "directions",
    code: "directions e52e",
  },
  {
    label: "directions_bike",
    code: "directions_bike e52f",
  },
  {
    label: "directions_boat",
    code: "directions_boat e532",
  },
  {
    label: "directions_boat_filled",
    code: "directions_boat_filled eff5",
  },
  {
    label: "directions_bus",
    code: "directions_bus e530",
  },
  {
    label: "directions_bus_filled",
    code: "directions_bus_filled eff6",
  },
  {
    label: "directions_car",
    code: "directions_car e531",
  },
  {
    label: "directions_car_filled",
    code: "directions_car_filled eff7",
  },
  {
    label: "directions_ferry",
    code: "directions_ferry e532",
  },
  {
    label: "directions_off",
    code: "directions_off f10f",
  },
  {
    label: "directions_railway",
    code: "directions_railway e534",
  },
  {
    label: "directions_railway_filled",
    code: "directions_railway_filled eff8",
  },
  {
    label: "directions_run",
    code: "directions_run e566",
  },
  {
    label: "directions_subway",
    code: "directions_subway e533",
  },
  {
    label: "directions_subway_filled",
    code: "directions_subway_filled eff9",
  },
  {
    label: "directions_train",
    code: "directions_train e534",
  },
  {
    label: "directions_transit",
    code: "directions_transit e535",
  },
  {
    label: "directions_transit_filled",
    code: "directions_transit_filled effa",
  },
  {
    label: "directions_walk",
    code: "directions_walk e536",
  },
  {
    label: "dirty_lens",
    code: "dirty_lens ef4b",
  },
  {
    label: "disabled_by_default",
    code: "disabled_by_default f230",
  },
  {
    label: "disabled_visible",
    code: "disabled_visible e76e",
  },
  {
    label: "disc_full",
    code: "disc_full e610",
  },
  {
    label: "discord",
    code: "discord ea6c",
  },
  {
    label: "discount",
    code: "discount ebc9",
  },
  {
    label: "display_settings",
    code: "display_settings eb97",
  },
  {
    label: "diversity_1",
    code: "diversity_1 f8d7",
  },
  {
    label: "diversity_2",
    code: "diversity_2 f8d8",
  },
  {
    label: "diversity_3",
    code: "diversity_3 f8d9",
  },
  {
    label: "dnd_forwardslash",
    code: "dnd_forwardslash e611",
  },
  {
    label: "dns",
    code: "dns e875",
  },
  {
    label: "do_disturb",
    code: "do_disturb f08c",
  },
  {
    label: "do_disturb_alt",
    code: "do_disturb_alt f08d",
  },
  {
    label: "do_disturb_off",
    code: "do_disturb_off f08e",
  },
  {
    label: "do_disturb_on",
    code: "do_disturb_on f08f",
  },
  {
    label: "do_not_disturb",
    code: "do_not_disturb e612",
  },
  {
    label: "do_not_disturb_alt",
    code: "do_not_disturb_alt e611",
  },
  {
    label: "do_not_disturb_off",
    code: "do_not_disturb_off e643",
  },
  {
    label: "do_not_disturb_on",
    code: "do_not_disturb_on e644",
  },
  {
    label: "do_not_disturb_on_total_silence",
    code: "do_not_disturb_on_total_silence effb",
  },
  {
    label: "do_not_step",
    code: "do_not_step f19f",
  },
  {
    label: "do_not_touch",
    code: "do_not_touch f1b0",
  },
  {
    label: "dock",
    code: "dock e30e",
  },
  {
    label: "document_scanner",
    code: "document_scanner e5fa",
  },
  {
    label: "domain",
    code: "domain e7ee",
  },
  {
    label: "domain_add",
    code: "domain_add eb62",
  },
  {
    label: "domain_disabled",
    code: "domain_disabled e0ef",
  },
  {
    label: "domain_verification",
    code: "domain_verification ef4c",
  },
  {
    label: "done",
    code: "done e876",
  },
  {
    label: "done_all",
    code: "done_all e877",
  },
  {
    label: "done_outline",
    code: "done_outline e92f",
  },
  {
    label: "donut_large",
    code: "donut_large e917",
  },
  {
    label: "donut_small",
    code: "donut_small e918",
  },
  {
    label: "door_back",
    code: "door_back effc",
  },
  {
    label: "door_front",
    code: "door_front effd",
  },
  {
    label: "door_sliding",
    code: "door_sliding effe",
  },
  {
    label: "doorbell",
    code: "doorbell efff",
  },
  {
    label: "double_arrow",
    code: "double_arrow ea50",
  },
  {
    label: "downhill_skiing",
    code: "downhill_skiing e509",
  },
  {
    label: "download",
    code: "download f090",
  },
  {
    label: "download_done",
    code: "download_done f091",
  },
  {
    label: "download_for_offline",
    code: "download_for_offline f000",
  },
  {
    label: "downloading",
    code: "downloading f001",
  },
  {
    label: "drafts",
    code: "drafts e151",
  },
  {
    label: "drag_handle",
    code: "drag_handle e25d",
  },
  {
    label: "drag_indicator",
    code: "drag_indicator e945",
  },
  {
    label: "draw",
    code: "draw e746",
  },
  {
    label: "drive_eta",
    code: "drive_eta e613",
  },
  {
    label: "drive_file_move",
    code: "drive_file_move e675",
  },
  {
    label: "drive_file_move_outline",
    code: "drive_file_move_outline e9a1",
  },
  {
    label: "drive_file_move_rtl",
    code: "drive_file_move_rtl e76d",
  },
  {
    label: "drive_file_rename_outline",
    code: "drive_file_rename_outline e9a2",
  },
  {
    label: "drive_folder_upload",
    code: "drive_folder_upload e9a3",
  },
  {
    label: "dry",
    code: "dry f1b3",
  },
  {
    label: "dry_cleaning",
    code: "dry_cleaning ea58",
  },
  {
    label: "duo",
    code: "duo e9a5",
  },
  {
    label: "dvr",
    code: "dvr e1b2",
  },
  {
    label: "dynamic_feed",
    code: "dynamic_feed ea14",
  },
  {
    label: "dynamic_form",
    code: "dynamic_form f1bf",
  },
  {
    label: "e_mobiledata",
    code: "e_mobiledata f002",
  },
  {
    label: "earbuds",
    code: "earbuds f003",
  },
  {
    label: "earbuds_battery",
    code: "earbuds_battery f004",
  },
  {
    label: "east",
    code: "east f1df",
  },
  {
    label: "eco",
    code: "eco ea35",
  },
  {
    label: "edgesensor_high",
    code: "edgesensor_high f005",
  },
  {
    label: "edgesensor_low",
    code: "edgesensor_low f006",
  },
  {
    label: "edit",
    code: "edit e3c9",
  },
  {
    label: "edit_attributes",
    code: "edit_attributes e578",
  },
  {
    label: "edit_calendar",
    code: "edit_calendar e742",
  },
  {
    label: "edit_document",
    code: "edit_document f88c",
  },
  {
    label: "edit_location",
    code: "edit_location e568",
  },
  {
    label: "edit_location_alt",
    code: "edit_location_alt e1c5",
  },
  {
    label: "edit_note",
    code: "edit_note e745",
  },
  {
    label: "edit_notifications",
    code: "edit_notifications e525",
  },
  {
    label: "edit_off",
    code: "edit_off e950",
  },
  {
    label: "edit_road",
    code: "edit_road ef4d",
  },
  {
    label: "edit_square",
    code: "edit_square f88d",
  },
  {
    label: "egg",
    code: "egg eacc",
  },
  {
    label: "egg_alt",
    code: "egg_alt eac8",
  },
  {
    label: "eject",
    code: "eject e8fb",
  },
  {
    label: "elderly",
    code: "elderly f21a",
  },
  {
    label: "elderly_woman",
    code: "elderly_woman eb69",
  },
  {
    label: "electric_bike",
    code: "electric_bike eb1b",
  },
  {
    label: "electric_bolt",
    code: "electric_bolt ec1c",
  },
  {
    label: "electric_car",
    code: "electric_car eb1c",
  },
  {
    label: "electric_meter",
    code: "electric_meter ec1b",
  },
  {
    label: "electric_moped",
    code: "electric_moped eb1d",
  },
  {
    label: "electric_rickshaw",
    code: "electric_rickshaw eb1e",
  },
  {
    label: "electric_scooter",
    code: "electric_scooter eb1f",
  },
  {
    label: "electrical_services",
    code: "electrical_services f102",
  },
  {
    label: "elevator",
    code: "elevator f1a0",
  },
  {
    label: "email",
    code: "email e0be",
  },
  {
    label: "emergency",
    code: "emergency e1eb",
  },
  {
    label: "emergency_recording",
    code: "emergency_recording ebf4",
  },
  {
    label: "emergency_share",
    code: "emergency_share ebf6",
  },
  {
    label: "emoji_emotions",
    code: "emoji_emotions ea22",
  },
  {
    label: "emoji_events",
    code: "emoji_events ea23",
  },
  {
    label: "emoji_flags",
    code: "emoji_flags ea1a",
  },
  {
    label: "emoji_food_beverage",
    code: "emoji_food_beverage ea1b",
  },
  {
    label: "emoji_nature",
    code: "emoji_nature ea1c",
  },
  {
    label: "emoji_objects",
    code: "emoji_objects ea24",
  },
  {
    label: "emoji_people",
    code: "emoji_people ea1d",
  },
  {
    label: "emoji_symbols",
    code: "emoji_symbols ea1e",
  },
  {
    label: "emoji_transportation",
    code: "emoji_transportation ea1f",
  },
  {
    label: "energy_savings_leaf",
    code: "energy_savings_leaf ec1a",
  },
  {
    label: "engineering",
    code: "engineering ea3d",
  },
  {
    label: "enhance_photo_translate",
    code: "enhance_photo_translate e8fc",
  },
  {
    label: "enhanced_encryption",
    code: "enhanced_encryption e63f",
  },
  {
    label: "equalizer",
    code: "equalizer e01d",
  },
  {
    label: "error",
    code: "error e000",
  },
  {
    label: "error_outline",
    code: "error_outline e001",
  },
  {
    label: "escalator",
    code: "escalator f1a1",
  },
  {
    label: "escalator_warning",
    code: "escalator_warning f1ac",
  },
  {
    label: "euro",
    code: "euro ea15",
  },
  {
    label: "euro_symbol",
    code: "euro_symbol e926",
  },
  {
    label: "ev_station",
    code: "ev_station e56d",
  },
  {
    label: "event",
    code: "event e878",
  },
  {
    label: "event_available",
    code: "event_available e614",
  },
  {
    label: "event_busy",
    code: "event_busy e615",
  },
  {
    label: "event_note",
    code: "event_note e616",
  },
  {
    label: "event_repeat",
    code: "event_repeat eb7b",
  },
  {
    label: "event_seat",
    code: "event_seat e903",
  },
  {
    label: "exit_to_app",
    code: "exit_to_app e879",
  },
  {
    label: "expand",
    code: "expand e94f",
  },
  {
    label: "expand_circle_down",
    code: "expand_circle_down e7cd",
  },
  {
    label: "expand_less",
    code: "expand_less e5ce",
  },
  {
    label: "expand_more",
    code: "expand_more e5cf",
  },
  {
    label: "explicit",
    code: "explicit e01e",
  },
  {
    label: "explore",
    code: "explore e87a",
  },
  {
    label: "explore_off",
    code: "explore_off e9a8",
  },
  {
    label: "exposure",
    code: "exposure e3ca",
  },
  {
    label: "exposure_minus_1",
    code: "exposure_minus_1 e3cb",
  },
  {
    label: "exposure_minus_2",
    code: "exposure_minus_2 e3cc",
  },
  {
    label: "exposure_neg_1",
    code: "exposure_neg_1 e3cb",
  },
  {
    label: "exposure_neg_2",
    code: "exposure_neg_2 e3cc",
  },
  {
    label: "exposure_plus_1",
    code: "exposure_plus_1 e3cd",
  },
  {
    label: "exposure_plus_2",
    code: "exposure_plus_2 e3ce",
  },
  {
    label: "exposure_zero",
    code: "exposure_zero e3cf",
  },
  {
    label: "extension",
    code: "extension e87b",
  },
  {
    label: "extension_off",
    code: "extension_off e4f5",
  },
  {
    label: "face",
    code: "face e87c",
  },
  {
    label: "face_2",
    code: "face_2 f8da",
  },
  {
    label: "face_3",
    code: "face_3 f8db",
  },
  {
    label: "face_4",
    code: "face_4 f8dc",
  },
  {
    label: "face_5",
    code: "face_5 f8dd",
  },
  {
    label: "face_6",
    code: "face_6 f8de",
  },
  {
    label: "face_retouching_natural",
    code: "face_retouching_natural ef4e",
  },
  {
    label: "face_retouching_off",
    code: "face_retouching_off f007",
  },
  {
    label: "facebook",
    code: "facebook f234",
  },
  {
    label: "fact_check",
    code: "fact_check f0c5",
  },
  {
    label: "factory",
    code: "factory ebbc",
  },
  {
    label: "family_restroom",
    code: "family_restroom f1a2",
  },
  {
    label: "fast_forward",
    code: "fast_forward e01f",
  },
  {
    label: "fast_rewind",
    code: "fast_rewind e020",
  },
  {
    label: "fastfood",
    code: "fastfood e57a",
  },
  {
    label: "favorite",
    code: "favorite e87d",
  },
  {
    label: "favorite_border",
    code: "favorite_border e87e",
  },
  {
    label: "favorite_outline",
    code: "favorite_outline e87e",
  },
  {
    label: "fax",
    code: "fax ead8",
  },
  {
    label: "featured_play_list",
    code: "featured_play_list e06d",
  },
  {
    label: "featured_video",
    code: "featured_video e06e",
  },
  {
    label: "feed",
    code: "feed f009",
  },
  {
    label: "feedback",
    code: "feedback e87f",
  },
  {
    label: "female",
    code: "female e590",
  },
  {
    label: "fence",
    code: "fence f1f6",
  },
  {
    label: "festival",
    code: "festival ea68",
  },
  {
    label: "fiber_dvr",
    code: "fiber_dvr e05d",
  },
  {
    label: "fiber_manual_record",
    code: "fiber_manual_record e061",
  },
  {
    label: "fiber_new",
    code: "fiber_new e05e",
  },
  {
    label: "fiber_pin",
    code: "fiber_pin e06a",
  },
  {
    label: "fiber_smart_record",
    code: "fiber_smart_record e062",
  },
  {
    label: "file_copy",
    code: "file_copy e173",
  },
  {
    label: "file_download",
    code: "file_download e2c4",
  },
  {
    label: "file_download_done",
    code: "file_download_done e9aa",
  },
  {
    label: "file_download_off",
    code: "file_download_off e4fe",
  },
  {
    label: "file_open",
    code: "file_open eaf3",
  },
  {
    label: "file_present",
    code: "file_present ea0e",
  },
  {
    label: "file_upload",
    code: "file_upload e2c6",
  },
  {
    label: "file_upload_off",
    code: "file_upload_off f886",
  },
  {
    label: "filter",
    code: "filter e3d3",
  },
  {
    label: "filter_1",
    code: "filter_1 e3d0",
  },
  {
    label: "filter_2",
    code: "filter_2 e3d1",
  },
  {
    label: "filter_3",
    code: "filter_3 e3d2",
  },
  {
    label: "filter_4",
    code: "filter_4 e3d4",
  },
  {
    label: "filter_5",
    code: "filter_5 e3d5",
  },
  {
    label: "filter_6",
    code: "filter_6 e3d6",
  },
  {
    label: "filter_7",
    code: "filter_7 e3d7",
  },
  {
    label: "filter_8",
    code: "filter_8 e3d8",
  },
  {
    label: "filter_9",
    code: "filter_9 e3d9",
  },
  {
    label: "filter_9_plus",
    code: "filter_9_plus e3da",
  },
  {
    label: "filter_alt",
    code: "filter_alt ef4f",
  },
  {
    label: "filter_alt_off",
    code: "filter_alt_off eb32",
  },
  {
    label: "filter_b_and_w",
    code: "filter_b_and_w e3db",
  },
  {
    label: "filter_center_focus",
    code: "filter_center_focus e3dc",
  },
  {
    label: "filter_drama",
    code: "filter_drama e3dd",
  },
  {
    label: "filter_frames",
    code: "filter_frames e3de",
  },
  {
    label: "filter_hdr",
    code: "filter_hdr e3df",
  },
  {
    label: "filter_list",
    code: "filter_list e152",
  },
  {
    label: "filter_list_alt",
    code: "filter_list_alt e94e",
  },
  {
    label: "filter_list_off",
    code: "filter_list_off eb57",
  },
  {
    label: "filter_none",
    code: "filter_none e3e0",
  },
  {
    label: "filter_tilt_shift",
    code: "filter_tilt_shift e3e2",
  },
  {
    label: "filter_vintage",
    code: "filter_vintage e3e3",
  },
  {
    label: "find_in_page",
    code: "find_in_page e880",
  },
  {
    label: "find_replace",
    code: "find_replace e881",
  },
  {
    label: "fingerprint",
    code: "fingerprint e90d",
  },
  {
    label: "fire_extinguisher",
    code: "fire_extinguisher f1d8",
  },
  {
    label: "fire_hydrant",
    code: "fire_hydrant f1a3",
  },
  {
    label: "fire_hydrant_alt",
    code: "fire_hydrant_alt f8f1",
  },
  {
    label: "fire_truck",
    code: "fire_truck f8f2",
  },
  {
    label: "fireplace",
    code: "fireplace ea43",
  },
  {
    label: "first_page",
    code: "first_page e5dc",
  },
  {
    label: "fit_screen",
    code: "fit_screen ea10",
  },
  {
    label: "fitbit",
    code: "fitbit e82b",
  },
  {
    label: "fitness_center",
    code: "fitness_center eb43",
  },
  {
    label: "flag",
    code: "flag e153",
  },
  {
    label: "flag_circle",
    code: "flag_circle eaf8",
  },
  {
    label: "flaky",
    code: "flaky ef50",
  },
  {
    label: "flare",
    code: "flare e3e4",
  },
  {
    label: "flash_auto",
    code: "flash_auto e3e5",
  },
  {
    label: "flash_off",
    code: "flash_off e3e6",
  },
  {
    label: "flash_on",
    code: "flash_on e3e7",
  },
  {
    label: "flashlight_off",
    code: "flashlight_off f00a",
  },
  {
    label: "flashlight_on",
    code: "flashlight_on f00b",
  },
  {
    label: "flatware",
    code: "flatware f00c",
  },
  {
    label: "flight",
    code: "flight e539",
  },
  {
    label: "flight_class",
    code: "flight_class e7cb",
  },
  {
    label: "flight_land",
    code: "flight_land e904",
  },
  {
    label: "flight_takeoff",
    code: "flight_takeoff e905",
  },
  {
    label: "flip",
    code: "flip e3e8",
  },
  {
    label: "flip_camera_android",
    code: "flip_camera_android ea37",
  },
  {
    label: "flip_camera_ios",
    code: "flip_camera_ios ea38",
  },
  {
    label: "flip_to_back",
    code: "flip_to_back e882",
  },
  {
    label: "flip_to_front",
    code: "flip_to_front e883",
  },
  {
    label: "flood",
    code: "flood ebe6",
  },
  {
    label: "flourescent",
    code: "flourescent ec31",
  },
  {
    label: "flourescent",
    code: "flourescent f00d",
  },
  {
    label: "fluorescent",
    code: "fluorescent ec31",
  },
  {
    label: "flutter_dash",
    code: "flutter_dash e00b",
  },
  {
    label: "fmd_bad",
    code: "fmd_bad f00e",
  },
  {
    label: "fmd_good",
    code: "fmd_good f00f",
  },
  {
    label: "foggy",
    code: "foggy e818",
  },
  {
    label: "folder",
    code: "folder e2c7",
  },
  {
    label: "folder_copy",
    code: "folder_copy ebbd",
  },
  {
    label: "folder_delete",
    code: "folder_delete eb34",
  },
  {
    label: "folder_off",
    code: "folder_off eb83",
  },
  {
    label: "folder_open",
    code: "folder_open e2c8",
  },
  {
    label: "folder_shared",
    code: "folder_shared e2c9",
  },
  {
    label: "folder_special",
    code: "folder_special e617",
  },
  {
    label: "folder_zip",
    code: "folder_zip eb2c",
  },
  {
    label: "follow_the_signs",
    code: "follow_the_signs f222",
  },
  {
    label: "font_download",
    code: "font_download e167",
  },
  {
    label: "font_download_off",
    code: "font_download_off e4f9",
  },
  {
    label: "food_bank",
    code: "food_bank f1f2",
  },
  {
    label: "forest",
    code: "forest ea99",
  },
  {
    label: "fork_left",
    code: "fork_left eba0",
  },
  {
    label: "fork_right",
    code: "fork_right ebac",
  },
  {
    label: "forklift",
    code: "forklift f868",
  },
  {
    label: "format_align_center",
    code: "format_align_center e234",
  },
  {
    label: "format_align_justify",
    code: "format_align_justify e235",
  },
  {
    label: "format_align_left",
    code: "format_align_left e236",
  },
  {
    label: "format_align_right",
    code: "format_align_right e237",
  },
  {
    label: "format_bold",
    code: "format_bold e238",
  },
  {
    label: "format_clear",
    code: "format_clear e239",
  },
  {
    label: "format_color_fill",
    code: "format_color_fill e23a",
  },
  {
    label: "format_color_reset",
    code: "format_color_reset e23b",
  },
  {
    label: "format_color_text",
    code: "format_color_text e23c",
  },
  {
    label: "format_indent_decrease",
    code: "format_indent_decrease e23d",
  },
  {
    label: "format_indent_increase",
    code: "format_indent_increase e23e",
  },
  {
    label: "format_italic",
    code: "format_italic e23f",
  },
  {
    label: "format_line_spacing",
    code: "format_line_spacing e240",
  },
  {
    label: "format_list_bulleted",
    code: "format_list_bulleted e241",
  },
  {
    label: "format_list_bulleted_add",
    code: "format_list_bulleted_add f849",
  },
  {
    label: "format_list_numbered",
    code: "format_list_numbered e242",
  },
  {
    label: "format_list_numbered_rtl",
    code: "format_list_numbered_rtl e267",
  },
  {
    label: "format_overline",
    code: "format_overline eb65",
  },
  {
    label: "format_paint",
    code: "format_paint e243",
  },
  {
    label: "format_quote",
    code: "format_quote e244",
  },
  {
    label: "format_shapes",
    code: "format_shapes e25e",
  },
  {
    label: "format_size",
    code: "format_size e245",
  },
  {
    label: "format_strikethrough",
    code: "format_strikethrough e246",
  },
  {
    label: "format_textdirection_l_to_r",
    code: "format_textdirection_l_to_r e247",
  },
  {
    label: "format_textdirection_r_to_l",
    code: "format_textdirection_r_to_l e248",
  },
  {
    label: "format_underline",
    code: "format_underline e249",
  },
  {
    label: "format_underlined",
    code: "format_underlined e249",
  },
  {
    label: "fort",
    code: "fort eaad",
  },
  {
    label: "forum",
    code: "forum e0bf",
  },
  {
    label: "forward",
    code: "forward e154",
  },
  {
    label: "forward_10",
    code: "forward_10 e056",
  },
  {
    label: "forward_30",
    code: "forward_30 e057",
  },
  {
    label: "forward_5",
    code: "forward_5 e058",
  },
  {
    label: "forward_to_inbox",
    code: "forward_to_inbox f187",
  },
  {
    label: "foundation",
    code: "foundation f200",
  },
  {
    label: "free_breakfast",
    code: "free_breakfast eb44",
  },
  {
    label: "free_cancellation",
    code: "free_cancellation e748",
  },
  {
    label: "front_hand",
    code: "front_hand e769",
  },
  {
    label: "front_loader",
    code: "front_loader f869",
  },
  {
    label: "fullscreen",
    code: "fullscreen e5d0",
  },
  {
    label: "fullscreen_exit",
    code: "fullscreen_exit e5d1",
  },
  {
    label: "functions",
    code: "functions e24a",
  },
  {
    label: "g_mobiledata",
    code: "g_mobiledata f010",
  },
  {
    label: "g_translate",
    code: "g_translate e927",
  },
  {
    label: "gamepad",
    code: "gamepad e30f",
  },
  {
    label: "games",
    code: "games e021",
  },
  {
    label: "garage",
    code: "garage f011",
  },
  {
    label: "gas_meter",
    code: "gas_meter ec19",
  },
  {
    label: "gavel",
    code: "gavel e90e",
  },
  {
    label: "generating_tokens",
    code: "generating_tokens e749",
  },
  {
    label: "gesture",
    code: "gesture e155",
  },
  {
    label: "get_app",
    code: "get_app e884",
  },
  {
    label: "gif",
    code: "gif e908",
  },
  {
    label: "gif_box",
    code: "gif_box e7a3",
  },
  {
    label: "girl",
    code: "girl eb68",
  },
  {
    label: "gite",
    code: "gite e58b",
  },
  {
    label: "goat",
    code: "goat 10fffd",
  },
  {
    label: "golf_course",
    code: "golf_course eb45",
  },
  {
    label: "gpp_bad",
    code: "gpp_bad f012",
  },
  {
    label: "gpp_good",
    code: "gpp_good f013",
  },
  {
    label: "gpp_maybe",
    code: "gpp_maybe f014",
  },
  {
    label: "gps_fixed",
    code: "gps_fixed e1b3",
  },
  {
    label: "gps_not_fixed",
    code: "gps_not_fixed e1b4",
  },
  {
    label: "gps_off",
    code: "gps_off e1b5",
  },
  {
    label: "grade",
    code: "grade e885",
  },
  {
    label: "gradient",
    code: "gradient e3e9",
  },
  {
    label: "grading",
    code: "grading ea4f",
  },
  {
    label: "grain",
    code: "grain e3ea",
  },
  {
    label: "graphic_eq",
    code: "graphic_eq e1b8",
  },
  {
    label: "grass",
    code: "grass f205",
  },
  {
    label: "grid_3x3",
    code: "grid_3x3 f015",
  },
  {
    label: "grid_4x4",
    code: "grid_4x4 f016",
  },
  {
    label: "grid_goldenratio",
    code: "grid_goldenratio f017",
  },
  {
    label: "grid_off",
    code: "grid_off e3eb",
  },
  {
    label: "grid_on",
    code: "grid_on e3ec",
  },
  {
    label: "grid_view",
    code: "grid_view e9b0",
  },
  {
    label: "group",
    code: "group e7ef",
  },
  {
    label: "group_add",
    code: "group_add e7f0",
  },
  {
    label: "group_off",
    code: "group_off e747",
  },
  {
    label: "group_remove",
    code: "group_remove e7ad",
  },
  {
    label: "group_work",
    code: "group_work e886",
  },
  {
    label: "groups",
    code: "groups f233",
  },
  {
    label: "groups_2",
    code: "groups_2 f8df",
  },
  {
    label: "groups_3",
    code: "groups_3 f8e0",
  },
  {
    label: "h_mobiledata",
    code: "h_mobiledata f018",
  },
  {
    label: "h_plus_mobiledata",
    code: "h_plus_mobiledata f019",
  },
  {
    label: "hail",
    code: "hail e9b1",
  },
  {
    label: "handshake",
    code: "handshake ebcb",
  },
  {
    label: "handyman",
    code: "handyman f10b",
  },
  {
    label: "hardware",
    code: "hardware ea59",
  },
  {
    label: "hd",
    code: "hd e052",
  },
  {
    label: "hdr_auto",
    code: "hdr_auto f01a",
  },
  {
    label: "hdr_auto_select",
    code: "hdr_auto_select f01b",
  },
  {
    label: "hdr_enhanced_select",
    code: "hdr_enhanced_select ef51",
  },
  {
    label: "hdr_off",
    code: "hdr_off e3ed",
  },
  {
    label: "hdr_off_select",
    code: "hdr_off_select f01c",
  },
  {
    label: "hdr_on",
    code: "hdr_on e3ee",
  },
  {
    label: "hdr_on_select",
    code: "hdr_on_select f01d",
  },
  {
    label: "hdr_plus",
    code: "hdr_plus f01e",
  },
  {
    label: "hdr_strong",
    code: "hdr_strong e3f1",
  },
  {
    label: "hdr_weak",
    code: "hdr_weak e3f2",
  },
  {
    label: "headphones",
    code: "headphones f01f",
  },
  {
    label: "headphones_battery",
    code: "headphones_battery f020",
  },
  {
    label: "headset",
    code: "headset e310",
  },
  {
    label: "headset_mic",
    code: "headset_mic e311",
  },
  {
    label: "headset_off",
    code: "headset_off e33a",
  },
  {
    label: "healing",
    code: "healing e3f3",
  },
  {
    label: "health_and_safety",
    code: "health_and_safety e1d5",
  },
  {
    label: "hearing",
    code: "hearing e023",
  },
  {
    label: "hearing_disabled",
    code: "hearing_disabled f104",
  },
  {
    label: "heart_broken",
    code: "heart_broken eac2",
  },
  {
    label: "heat_pump",
    code: "heat_pump ec18",
  },
  {
    label: "height",
    code: "height ea16",
  },
  {
    label: "help",
    code: "help e887",
  },
  {
    label: "help_center",
    code: "help_center f1c0",
  },
  {
    label: "help_outline",
    code: "help_outline e8fd",
  },
  {
    label: "hevc",
    code: "hevc f021",
  },
  {
    label: "hexagon",
    code: "hexagon eb39",
  },
  {
    label: "hide_image",
    code: "hide_image f022",
  },
  {
    label: "hide_source",
    code: "hide_source f023",
  },
  {
    label: "high_quality",
    code: "high_quality e024",
  },
  {
    label: "highlight",
    code: "highlight e25f",
  },
  {
    label: "highlight_alt",
    code: "highlight_alt ef52",
  },
  {
    label: "highlight_off",
    code: "highlight_off e888",
  },
  {
    label: "highlight_remove",
    code: "highlight_remove e888",
  },
  {
    label: "hiking",
    code: "hiking e50a",
  },
  {
    label: "history",
    code: "history e889",
  },
  {
    label: "history_edu",
    code: "history_edu ea3e",
  },
  {
    label: "history_toggle_off",
    code: "history_toggle_off f17d",
  },
  {
    label: "hive",
    code: "hive eaa6",
  },
  {
    label: "hls",
    code: "hls eb8a",
  },
  {
    label: "hls_off",
    code: "hls_off eb8c",
  },
  {
    label: "holiday_village",
    code: "holiday_village e58a",
  },
  {
    label: "home",
    code: "home e88a",
  },
  {
    label: "home_filled",
    code: "home_filled e9b2",
  },
  {
    label: "home_max",
    code: "home_max f024",
  },
  {
    label: "home_mini",
    code: "home_mini f025",
  },
  {
    label: "home_repair_service",
    code: "home_repair_service f100",
  },
  {
    label: "home_work",
    code: "home_work ea09",
  },
  {
    label: "horizontal_distribute",
    code: "horizontal_distribute e014",
  },
  {
    label: "horizontal_rule",
    code: "horizontal_rule f108",
  },
  {
    label: "horizontal_split",
    code: "horizontal_split e947",
  },
  {
    label: "hot_tub",
    code: "hot_tub eb46",
  },
  {
    label: "hotel",
    code: "hotel e53a",
  },
  {
    label: "hotel_class",
    code: "hotel_class e743",
  },
  {
    label: "hourglass_bottom",
    code: "hourglass_bottom ea5c",
  },
  {
    label: "hourglass_disabled",
    code: "hourglass_disabled ef53",
  },
  {
    label: "hourglass_empty",
    code: "hourglass_empty e88b",
  },
  {
    label: "hourglass_full",
    code: "hourglass_full e88c",
  },
  {
    label: "hourglass_top",
    code: "hourglass_top ea5b",
  },
  {
    label: "house",
    code: "house ea44",
  },
  {
    label: "house_siding",
    code: "house_siding f202",
  },
  {
    label: "houseboat",
    code: "houseboat e584",
  },
  {
    label: "how_to_reg",
    code: "how_to_reg e174",
  },
  {
    label: "how_to_vote",
    code: "how_to_vote e175",
  },
  {
    label: "html",
    code: "html eb7e",
  },
  {
    label: "http",
    code: "http e902",
  },
  {
    label: "https",
    code: "https e88d",
  },
  {
    label: "hub",
    code: "hub e9f4",
  },
  {
    label: "hvac",
    code: "hvac f10e",
  },
  {
    label: "ice_skating",
    code: "ice_skating e50b",
  },
  {
    label: "icecream",
    code: "icecream ea69",
  },
  {
    label: "image",
    code: "image e3f4",
  },
  {
    label: "image_aspect_ratio",
    code: "image_aspect_ratio e3f5",
  },
  {
    label: "image_not_supported",
    code: "image_not_supported f116",
  },
  {
    label: "image_search",
    code: "image_search e43f",
  },
  {
    label: "imagesearch_roller",
    code: "imagesearch_roller e9b4",
  },
  {
    label: "import_contacts",
    code: "import_contacts e0e0",
  },
  {
    label: "import_export",
    code: "import_export e0c3",
  },
  {
    label: "important_devices",
    code: "important_devices e912",
  },
  {
    label: "inbox",
    code: "inbox e156",
  },
  {
    label: "incomplete_circle",
    code: "incomplete_circle e79b",
  },
  {
    label: "indeterminate_check_box",
    code: "indeterminate_check_box e909",
  },
  {
    label: "info",
    code: "info e88e",
  },
  {
    label: "info_outline",
    code: "info_outline e88f",
  },
  {
    label: "input",
    code: "input e890",
  },
  {
    label: "insert_chart",
    code: "insert_chart e24b",
  },
  {
    label: "insert_chart_outlined",
    code: "insert_chart_outlined e26a",
  },
  {
    label: "insert_comment",
    code: "insert_comment e24c",
  },
  {
    label: "insert_drive_file",
    code: "insert_drive_file e24d",
  },
  {
    label: "insert_emoticon",
    code: "insert_emoticon e24e",
  },
  {
    label: "insert_invitation",
    code: "insert_invitation e24f",
  },
  {
    label: "insert_link",
    code: "insert_link e250",
  },
  {
    label: "insert_page_break",
    code: "insert_page_break eaca",
  },
  {
    label: "insert_photo",
    code: "insert_photo e251",
  },
  {
    label: "insights",
    code: "insights f092",
  },
  {
    label: "install_desktop",
    code: "install_desktop eb71",
  },
  {
    label: "install_mobile",
    code: "install_mobile eb72",
  },
  {
    label: "integration_instructions",
    code: "integration_instructions ef54",
  },
  {
    label: "interests",
    code: "interests e7c8",
  },
  {
    label: "interpreter_mode",
    code: "interpreter_mode e83b",
  },
  {
    label: "inventory",
    code: "inventory e179",
  },
  {
    label: "inventory_2",
    code: "inventory_2 e1a1",
  },
  {
    label: "invert_colors",
    code: "invert_colors e891",
  },
  {
    label: "invert_colors_off",
    code: "invert_colors_off e0c4",
  },
  {
    label: "invert_colors_on",
    code: "invert_colors_on e891",
  },
  {
    label: "ios_share",
    code: "ios_share e6b8",
  },
  {
    label: "iron",
    code: "iron e583",
  },
  {
    label: "iso",
    code: "iso e3f6",
  },
  {
    label: "javascript",
    code: "javascript eb7c",
  },
  {
    label: "join_full",
    code: "join_full eaeb",
  },
  {
    label: "join_inner",
    code: "join_inner eaf4",
  },
  {
    label: "join_left",
    code: "join_left eaf2",
  },
  {
    label: "join_right",
    code: "join_right eaea",
  },
  {
    label: "kayaking",
    code: "kayaking e50c",
  },
  {
    label: "kebab_dining",
    code: "kebab_dining e842",
  },
  {
    label: "key",
    code: "key e73c",
  },
  {
    label: "key_off",
    code: "key_off eb84",
  },
  {
    label: "keyboard",
    code: "keyboard e312",
  },
  {
    label: "keyboard_alt",
    code: "keyboard_alt f028",
  },
  {
    label: "keyboard_arrow_down",
    code: "keyboard_arrow_down e313",
  },
  {
    label: "keyboard_arrow_left",
    code: "keyboard_arrow_left e314",
  },
  {
    label: "keyboard_arrow_right",
    code: "keyboard_arrow_right e315",
  },
  {
    label: "keyboard_arrow_up",
    code: "keyboard_arrow_up e316",
  },
  {
    label: "keyboard_backspace",
    code: "keyboard_backspace e317",
  },
  {
    label: "keyboard_capslock",
    code: "keyboard_capslock e318",
  },
  {
    label: "keyboard_command",
    code: "keyboard_command eae0",
  },
  {
    label: "keyboard_command_key",
    code: "keyboard_command_key eae7",
  },
  {
    label: "keyboard_control",
    code: "keyboard_control e5d3",
  },
  {
    label: "keyboard_control_key",
    code: "keyboard_control_key eae6",
  },
  {
    label: "keyboard_double_arrow_down",
    code: "keyboard_double_arrow_down ead0",
  },
  {
    label: "keyboard_double_arrow_left",
    code: "keyboard_double_arrow_left eac3",
  },
  {
    label: "keyboard_double_arrow_right",
    code: "keyboard_double_arrow_right eac9",
  },
  {
    label: "keyboard_double_arrow_up",
    code: "keyboard_double_arrow_up eacf",
  },
  {
    label: "keyboard_hide",
    code: "keyboard_hide e31a",
  },
  {
    label: "keyboard_option",
    code: "keyboard_option eadf",
  },
  {
    label: "keyboard_option_key",
    code: "keyboard_option_key eae8",
  },
  {
    label: "keyboard_return",
    code: "keyboard_return e31b",
  },
  {
    label: "keyboard_tab",
    code: "keyboard_tab e31c",
  },
  {
    label: "keyboard_voice",
    code: "keyboard_voice e31d",
  },
  {
    label: "king_bed",
    code: "king_bed ea45",
  },
  {
    label: "kitchen",
    code: "kitchen eb47",
  },
  {
    label: "kitesurfing",
    code: "kitesurfing e50d",
  },
  {
    label: "label",
    code: "label e892",
  },
  {
    label: "label_important",
    code: "label_important e937",
  },
  {
    label: "label_important_outline",
    code: "label_important_outline e948",
  },
  {
    label: "label_off",
    code: "label_off e9b6",
  },
  {
    label: "label_outline",
    code: "label_outline e893",
  },
  {
    label: "lan",
    code: "lan eb2f",
  },
  {
    label: "landscape",
    code: "landscape e3f7",
  },
  {
    label: "landslide",
    code: "landslide ebd7",
  },
  {
    label: "language",
    code: "language e894",
  },
  {
    label: "laptop",
    code: "laptop e31e",
  },
  {
    label: "laptop_chromebook",
    code: "laptop_chromebook e31f",
  },
  {
    label: "laptop_mac",
    code: "laptop_mac e320",
  },
  {
    label: "laptop_windows",
    code: "laptop_windows e321",
  },
  {
    label: "last_page",
    code: "last_page e5dd",
  },
  {
    label: "launch",
    code: "launch e895",
  },
  {
    label: "layers",
    code: "layers e53b",
  },
  {
    label: "layers_clear",
    code: "layers_clear e53c",
  },
  {
    label: "leaderboard",
    code: "leaderboard f20c",
  },
  {
    label: "leak_add",
    code: "leak_add e3f8",
  },
  {
    label: "leak_remove",
    code: "leak_remove e3f9",
  },
  {
    label: "leave_bags_at_home",
    code: "leave_bags_at_home f21b",
  },
  {
    label: "legend_toggle",
    code: "legend_toggle f11b",
  },
  {
    label: "lens",
    code: "lens e3fa",
  },
  {
    label: "lens_blur",
    code: "lens_blur f029",
  },
  {
    label: "library_add",
    code: "library_add e02e",
  },
  {
    label: "library_add_check",
    code: "library_add_check e9b7",
  },
  {
    label: "library_books",
    code: "library_books e02f",
  },
  {
    label: "library_music",
    code: "library_music e030",
  },
  {
    label: "light",
    code: "light f02a",
  },
  {
    label: "light_mode",
    code: "light_mode e518",
  },
  {
    label: "lightbulb",
    code: "lightbulb e0f0",
  },
  {
    label: "lightbulb_circle",
    code: "lightbulb_circle ebfe",
  },
  {
    label: "lightbulb_outline",
    code: "lightbulb_outline e90f",
  },
  {
    label: "line_axis",
    code: "line_axis ea9a",
  },
  {
    label: "line_style",
    code: "line_style e919",
  },
  {
    label: "line_weight",
    code: "line_weight e91a",
  },
  {
    label: "linear_scale",
    code: "linear_scale e260",
  },
  {
    label: "link",
    code: "link e157",
  },
  {
    label: "link_off",
    code: "link_off e16f",
  },
  {
    label: "linked_camera",
    code: "linked_camera e438",
  },
  {
    label: "liquor",
    code: "liquor ea60",
  },
  {
    label: "list",
    code: "list e896",
  },
  {
    label: "list_alt",
    code: "list_alt e0ee",
  },
  {
    label: "live_help",
    code: "live_help e0c6",
  },
  {
    label: "live_tv",
    code: "live_tv e639",
  },
  {
    label: "living",
    code: "living f02b",
  },
  {
    label: "local_activity",
    code: "local_activity e53f",
  },
  {
    label: "local_airport",
    code: "local_airport e53d",
  },
  {
    label: "local_atm",
    code: "local_atm e53e",
  },
  {
    label: "local_attraction",
    code: "local_attraction e53f",
  },
  {
    label: "local_bar",
    code: "local_bar e540",
  },
  {
    label: "local_cafe",
    code: "local_cafe e541",
  },
  {
    label: "local_car_wash",
    code: "local_car_wash e542",
  },
  {
    label: "local_convenience_store",
    code: "local_convenience_store e543",
  },
  {
    label: "local_dining",
    code: "local_dining e556",
  },
  {
    label: "local_drink",
    code: "local_drink e544",
  },
  {
    label: "local_fire_department",
    code: "local_fire_department ef55",
  },
  {
    label: "local_florist",
    code: "local_florist e545",
  },
  {
    label: "local_gas_station",
    code: "local_gas_station e546",
  },
  {
    label: "local_grocery_store",
    code: "local_grocery_store e547",
  },
  {
    label: "local_hospital",
    code: "local_hospital e548",
  },
  {
    label: "local_hotel",
    code: "local_hotel e549",
  },
  {
    label: "local_laundry_service",
    code: "local_laundry_service e54a",
  },
  {
    label: "local_library",
    code: "local_library e54b",
  },
  {
    label: "local_mall",
    code: "local_mall e54c",
  },
  {
    label: "local_movies",
    code: "local_movies e54d",
  },
  {
    label: "local_offer",
    code: "local_offer e54e",
  },
  {
    label: "local_parking",
    code: "local_parking e54f",
  },
  {
    label: "local_pharmacy",
    code: "local_pharmacy e550",
  },
  {
    label: "local_phone",
    code: "local_phone e551",
  },
  {
    label: "local_pizza",
    code: "local_pizza e552",
  },
  {
    label: "local_play",
    code: "local_play e553",
  },
  {
    label: "local_police",
    code: "local_police ef56",
  },
  {
    label: "local_post_office",
    code: "local_post_office e554",
  },
  {
    label: "local_print_shop",
    code: "local_print_shop e555",
  },
  {
    label: "local_printshop",
    code: "local_printshop e555",
  },
  {
    label: "local_restaurant",
    code: "local_restaurant e556",
  },
  {
    label: "local_see",
    code: "local_see e557",
  },
  {
    label: "local_shipping",
    code: "local_shipping e558",
  },
  {
    label: "local_taxi",
    code: "local_taxi e559",
  },
  {
    label: "location_city",
    code: "location_city e7f1",
  },
  {
    label: "location_disabled",
    code: "location_disabled e1b6",
  },
  {
    label: "location_history",
    code: "location_history e55a",
  },
  {
    label: "location_off",
    code: "location_off e0c7",
  },
  {
    label: "location_on",
    code: "location_on e0c8",
  },
  {
    label: "location_pin",
    code: "location_pin f1db",
  },
  {
    label: "location_searching",
    code: "location_searching e1b7",
  },
  {
    label: "lock",
    code: "lock e897",
  },
  {
    label: "lock_clock",
    code: "lock_clock ef57",
  },
  {
    label: "lock_open",
    code: "lock_open e898",
  },
  {
    label: "lock_outline",
    code: "lock_outline e899",
  },
  {
    label: "lock_person",
    code: "lock_person f8f3",
  },
  {
    label: "lock_reset",
    code: "lock_reset eade",
  },
  {
    label: "login",
    code: "login ea77",
  },
  {
    label: "logo_dev",
    code: "logo_dev ead6",
  },
  {
    label: "logout",
    code: "logout e9ba",
  },
  {
    label: "looks",
    code: "looks e3fc",
  },
  {
    label: "looks_3",
    code: "looks_3 e3fb",
  },
  {
    label: "looks_4",
    code: "looks_4 e3fd",
  },
  {
    label: "looks_5",
    code: "looks_5 e3fe",
  },
  {
    label: "looks_6",
    code: "looks_6 e3ff",
  },
  {
    label: "looks_one",
    code: "looks_one e400",
  },
  {
    label: "looks_two",
    code: "looks_two e401",
  },
  {
    label: "loop",
    code: "loop e028",
  },
  {
    label: "loupe",
    code: "loupe e402",
  },
  {
    label: "low_priority",
    code: "low_priority e16d",
  },
  {
    label: "loyalty",
    code: "loyalty e89a",
  },
  {
    label: "lte_mobiledata",
    code: "lte_mobiledata f02c",
  },
  {
    label: "lte_plus_mobiledata",
    code: "lte_plus_mobiledata f02d",
  },
  {
    label: "luggage",
    code: "luggage f235",
  },
  {
    label: "lunch_dining",
    code: "lunch_dining ea61",
  },
  {
    label: "lyrics",
    code: "lyrics ec0b",
  },
  {
    label: "macro_off",
    code: "macro_off f8d2",
  },
  {
    label: "mail",
    code: "mail e158",
  },
  {
    label: "mail_lock",
    code: "mail_lock ec0a",
  },
  {
    label: "mail_outline",
    code: "mail_outline e0e1",
  },
  {
    label: "male",
    code: "male e58e",
  },
  {
    label: "man",
    code: "man e4eb",
  },
  {
    label: "man_2",
    code: "man_2 f8e1",
  },
  {
    label: "man_3",
    code: "man_3 f8e2",
  },
  {
    label: "man_4",
    code: "man_4 f8e3",
  },
  {
    label: "manage_accounts",
    code: "manage_accounts f02e",
  },
  {
    label: "manage_history",
    code: "manage_history ebe7",
  },
  {
    label: "manage_search",
    code: "manage_search f02f",
  },
  {
    label: "map",
    code: "map e55b",
  },
  {
    label: "maps_home_work",
    code: "maps_home_work f030",
  },
  {
    label: "maps_ugc",
    code: "maps_ugc ef58",
  },
  {
    label: "margin",
    code: "margin e9bb",
  },
  {
    label: "mark_as_unread",
    code: "mark_as_unread e9bc",
  },
  {
    label: "mark_chat_read",
    code: "mark_chat_read f18b",
  },
  {
    label: "mark_chat_unread",
    code: "mark_chat_unread f189",
  },
  {
    label: "mark_email_read",
    code: "mark_email_read f18c",
  },
  {
    label: "mark_email_unread",
    code: "mark_email_unread f18a",
  },
  {
    label: "mark_unread_chat_alt",
    code: "mark_unread_chat_alt eb9d",
  },
  {
    label: "markunread",
    code: "markunread e159",
  },
  {
    label: "markunread_mailbox",
    code: "markunread_mailbox e89b",
  },
  {
    label: "masks",
    code: "masks f218",
  },
  {
    label: "maximize",
    code: "maximize e930",
  },
  {
    label: "media_bluetooth_off",
    code: "media_bluetooth_off f031",
  },
  {
    label: "media_bluetooth_on",
    code: "media_bluetooth_on f032",
  },
  {
    label: "mediation",
    code: "mediation efa7",
  },
  {
    label: "medical_information",
    code: "medical_information ebed",
  },
  {
    label: "medical_services",
    code: "medical_services f109",
  },
  {
    label: "medication",
    code: "medication f033",
  },
  {
    label: "medication_liquid",
    code: "medication_liquid ea87",
  },
  {
    label: "meeting_room",
    code: "meeting_room eb4f",
  },
  {
    label: "memory",
    code: "memory e322",
  },
  {
    label: "menu",
    code: "menu e5d2",
  },
  {
    label: "menu_book",
    code: "menu_book ea19",
  },
  {
    label: "menu_open",
    code: "menu_open e9bd",
  },
  {
    label: "merge",
    code: "merge eb98",
  },
  {
    label: "merge_type",
    code: "merge_type e252",
  },
  {
    label: "message",
    code: "message e0c9",
  },
  {
    label: "messenger",
    code: "messenger e0ca",
  },
  {
    label: "messenger_outline",
    code: "messenger_outline e0cb",
  },
  {
    label: "mic",
    code: "mic e029",
  },
  {
    label: "mic_external_off",
    code: "mic_external_off ef59",
  },
  {
    label: "mic_external_on",
    code: "mic_external_on ef5a",
  },
  {
    label: "mic_none",
    code: "mic_none e02a",
  },
  {
    label: "mic_off",
    code: "mic_off e02b",
  },
  {
    label: "microwave",
    code: "microwave f204",
  },
  {
    label: "military_tech",
    code: "military_tech ea3f",
  },
  {
    label: "minimize",
    code: "minimize e931",
  },
  {
    label: "minor_crash",
    code: "minor_crash ebf1",
  },
  {
    label: "miscellaneous_services",
    code: "miscellaneous_services f10c",
  },
  {
    label: "missed_video_call",
    code: "missed_video_call e073",
  },
  {
    label: "mms",
    code: "mms e618",
  },
  {
    label: "mobile_friendly",
    code: "mobile_friendly e200",
  },
  {
    label: "mobile_off",
    code: "mobile_off e201",
  },
  {
    label: "mobile_screen_share",
    code: "mobile_screen_share e0e7",
  },
  {
    label: "mobiledata_off",
    code: "mobiledata_off f034",
  },
  {
    label: "mode",
    code: "mode f097",
  },
  {
    label: "mode_comment",
    code: "mode_comment e253",
  },
  {
    label: "mode_edit",
    code: "mode_edit e254",
  },
  {
    label: "mode_edit_outline",
    code: "mode_edit_outline f035",
  },
  {
    label: "mode_fan_off",
    code: "mode_fan_off ec17",
  },
  {
    label: "mode_night",
    code: "mode_night f036",
  },
  {
    label: "mode_of_travel",
    code: "mode_of_travel e7ce",
  },
  {
    label: "mode_standby",
    code: "mode_standby f037",
  },
  {
    label: "model_training",
    code: "model_training f0cf",
  },
  {
    label: "monetization_on",
    code: "monetization_on e263",
  },
  {
    label: "money",
    code: "money e57d",
  },
  {
    label: "money_off",
    code: "money_off e25c",
  },
  {
    label: "money_off_csred",
    code: "money_off_csred f038",
  },
  {
    label: "monitor",
    code: "monitor ef5b",
  },
  {
    label: "monitor_heart",
    code: "monitor_heart eaa2",
  },
  {
    label: "monitor_weight",
    code: "monitor_weight f039",
  },
  {
    label: "monochrome_photos",
    code: "monochrome_photos e403",
  },
  {
    label: "mood",
    code: "mood e7f2",
  },
  {
    label: "mood_bad",
    code: "mood_bad e7f3",
  },
  {
    label: "moped",
    code: "moped eb28",
  },
  {
    label: "more",
    code: "more e619",
  },
  {
    label: "more_horiz",
    code: "more_horiz e5d3",
  },
  {
    label: "more_time",
    code: "more_time ea5d",
  },
  {
    label: "more_vert",
    code: "more_vert e5d4",
  },
  {
    label: "mosque",
    code: "mosque eab2",
  },
  {
    label: "motion_photos_auto",
    code: "motion_photos_auto f03a",
  },
  {
    label: "motion_photos_off",
    code: "motion_photos_off e9c0",
  },
  {
    label: "motion_photos_on",
    code: "motion_photos_on e9c1",
  },
  {
    label: "motion_photos_pause",
    code: "motion_photos_pause f227",
  },
  {
    label: "motion_photos_paused",
    code: "motion_photos_paused e9c2",
  },
  {
    label: "motorcycle",
    code: "motorcycle e91b",
  },
  {
    label: "mouse",
    code: "mouse e323",
  },
  {
    label: "move_down",
    code: "move_down eb61",
  },
  {
    label: "move_to_inbox",
    code: "move_to_inbox e168",
  },
  {
    label: "move_up",
    code: "move_up eb64",
  },
  {
    label: "movie",
    code: "movie e02c",
  },
  {
    label: "movie_creation",
    code: "movie_creation e404",
  },
  {
    label: "movie_edit",
    code: "movie_edit f840",
  },
  {
    label: "movie_filter",
    code: "movie_filter e43a",
  },
  {
    label: "moving",
    code: "moving e501",
  },
  {
    label: "mp",
    code: "mp e9c3",
  },
  {
    label: "multiline_chart",
    code: "multiline_chart e6df",
  },
  {
    label: "multiple_stop",
    code: "multiple_stop f1b9",
  },
  {
    label: "multitrack_audio",
    code: "multitrack_audio e1b8",
  },
  {
    label: "museum",
    code: "museum ea36",
  },
  {
    label: "music_note",
    code: "music_note e405",
  },
  {
    label: "music_off",
    code: "music_off e440",
  },
  {
    label: "music_video",
    code: "music_video e063",
  },
  {
    label: "my_library_add",
    code: "my_library_add e02e",
  },
  {
    label: "my_library_books",
    code: "my_library_books e02f",
  },
  {
    label: "my_library_music",
    code: "my_library_music e030",
  },
  {
    label: "my_location",
    code: "my_location e55c",
  },
  {
    label: "nat",
    code: "nat ef5c",
  },
  {
    label: "nature",
    code: "nature e406",
  },
  {
    label: "nature_people",
    code: "nature_people e407",
  },
  {
    label: "navigate_before",
    code: "navigate_before e408",
  },
  {
    label: "navigate_next",
    code: "navigate_next e409",
  },
  {
    label: "navigation",
    code: "navigation e55d",
  },
  {
    label: "near_me",
    code: "near_me e569",
  },
  {
    label: "near_me_disabled",
    code: "near_me_disabled f1ef",
  },
  {
    label: "nearby_error",
    code: "nearby_error f03b",
  },
  {
    label: "nearby_off",
    code: "nearby_off f03c",
  },
  {
    label: "nest_cam_wired_stand",
    code: "nest_cam_wired_stand ec16",
  },
  {
    label: "network_cell",
    code: "network_cell e1b9",
  },
  {
    label: "network_check",
    code: "network_check e640",
  },
  {
    label: "network_locked",
    code: "network_locked e61a",
  },
  {
    label: "network_ping",
    code: "network_ping ebca",
  },
  {
    label: "network_wifi",
    code: "network_wifi e1ba",
  },
  {
    label: "network_wifi_1_bar",
    code: "network_wifi_1_bar ebe4",
  },
  {
    label: "network_wifi_2_bar",
    code: "network_wifi_2_bar ebd6",
  },
  {
    label: "network_wifi_3_bar",
    code: "network_wifi_3_bar ebe1",
  },
  {
    label: "new_label",
    code: "new_label e609",
  },
  {
    label: "new_releases",
    code: "new_releases e031",
  },
  {
    label: "newspaper",
    code: "newspaper eb81",
  },
  {
    label: "next_plan",
    code: "next_plan ef5d",
  },
  {
    label: "next_week",
    code: "next_week e16a",
  },
  {
    label: "nfc",
    code: "nfc e1bb",
  },
  {
    label: "night_shelter",
    code: "night_shelter f1f1",
  },
  {
    label: "nightlife",
    code: "nightlife ea62",
  },
  {
    label: "nightlight",
    code: "nightlight f03d",
  },
  {
    label: "nightlight_round",
    code: "nightlight_round ef5e",
  },
  {
    label: "nights_stay",
    code: "nights_stay ea46",
  },
  {
    label: "no_accounts",
    code: "no_accounts f03e",
  },
  {
    label: "no_adult_content",
    code: "no_adult_content f8fe",
  },
  {
    label: "no_backpack",
    code: "no_backpack f237",
  },
  {
    label: "no_cell",
    code: "no_cell f1a4",
  },
  {
    label: "no_crash",
    code: "no_crash ebf0",
  },
  {
    label: "no_drinks",
    code: "no_drinks f1a5",
  },
  {
    label: "no_encryption",
    code: "no_encryption e641",
  },
  {
    label: "no_encryption_gmailerrorred",
    code: "no_encryption_gmailerrorred f03f",
  },
  {
    label: "no_flash",
    code: "no_flash f1a6",
  },
  {
    label: "no_food",
    code: "no_food f1a7",
  },
  {
    label: "no_luggage",
    code: "no_luggage f23b",
  },
  {
    label: "no_meals",
    code: "no_meals f1d6",
  },
  {
    label: "no_meals_ouline",
    code: "no_meals_ouline f229",
  },
  {
    label: "no_meeting_room",
    code: "no_meeting_room eb4e",
  },
  {
    label: "no_photography",
    code: "no_photography f1a8",
  },
  {
    label: "no_sim",
    code: "no_sim e0cc",
  },
  {
    label: "no_stroller",
    code: "no_stroller f1af",
  },
  {
    label: "no_transfer",
    code: "no_transfer f1d5",
  },
  {
    label: "noise_aware",
    code: "noise_aware ebec",
  },
  {
    label: "noise_control_off",
    code: "noise_control_off ebf3",
  },
  {
    label: "nordic_walking",
    code: "nordic_walking e50e",
  },
  {
    label: "north",
    code: "north f1e0",
  },
  {
    label: "north_east",
    code: "north_east f1e1",
  },
  {
    label: "north_west",
    code: "north_west f1e2",
  },
  {
    label: "not_accessible",
    code: "not_accessible f0fe",
  },
  {
    label: "not_interested",
    code: "not_interested e033",
  },
  {
    label: "not_listed_location",
    code: "not_listed_location e575",
  },
  {
    label: "not_started",
    code: "not_started f0d1",
  },
  {
    label: "note",
    code: "note e06f",
  },
  {
    label: "note_add",
    code: "note_add e89c",
  },
  {
    label: "note_alt",
    code: "note_alt f040",
  },
  {
    label: "notes",
    code: "notes e26c",
  },
  {
    label: "notification_add",
    code: "notification_add e399",
  },
  {
    label: "notification_important",
    code: "notification_important e004",
  },
  {
    label: "notifications",
    code: "notifications e7f4",
  },
  {
    label: "notifications_active",
    code: "notifications_active e7f7",
  },
  {
    label: "notifications_none",
    code: "notifications_none e7f5",
  },
  {
    label: "notifications_off",
    code: "notifications_off e7f6",
  },
  {
    label: "notifications_on",
    code: "notifications_on e7f7",
  },
  {
    label: "notifications_paused",
    code: "notifications_paused e7f8",
  },
  {
    label: "now_wallpaper",
    code: "now_wallpaper e1bc",
  },
  {
    label: "now_widgets",
    code: "now_widgets e1bd",
  },
  {
    label: "numbers",
    code: "numbers eac7",
  },
  {
    label: "offline_bolt",
    code: "offline_bolt e932",
  },
  {
    label: "offline_pin",
    code: "offline_pin e90a",
  },
  {
    label: "offline_share",
    code: "offline_share e9c5",
  },
  {
    label: "oil_barrel",
    code: "oil_barrel ec15",
  },
  {
    label: "on_device_training",
    code: "on_device_training ebfd",
  },
  {
    label: "ondemand_video",
    code: "ondemand_video e63a",
  },
  {
    label: "online_prediction",
    code: "online_prediction f0eb",
  },
  {
    label: "opacity",
    code: "opacity e91c",
  },
  {
    label: "open_in_browser",
    code: "open_in_browser e89d",
  },
  {
    label: "open_in_full",
    code: "open_in_full f1ce",
  },
  {
    label: "open_in_new",
    code: "open_in_new e89e",
  },
  {
    label: "open_in_new_off",
    code: "open_in_new_off e4f6",
  },
  {
    label: "open_with",
    code: "open_with e89f",
  },
  {
    label: "other_houses",
    code: "other_houses e58c",
  },
  {
    label: "outbond",
    code: "outbond f228",
  },
  {
    label: "outbound",
    code: "outbound e1ca",
  },
  {
    label: "outbox",
    code: "outbox ef5f",
  },
  {
    label: "outdoor_grill",
    code: "outdoor_grill ea47",
  },
  {
    label: "outgoing_mail",
    code: "outgoing_mail f0d2",
  },
  {
    label: "outlet",
    code: "outlet f1d4",
  },
  {
    label: "outlined_flag",
    code: "outlined_flag e16e",
  },
  {
    label: "output",
    code: "output ebbe",
  },
  {
    label: "padding",
    code: "padding e9c8",
  },
  {
    label: "pages",
    code: "pages e7f9",
  },
  {
    label: "pageview",
    code: "pageview e8a0",
  },
  {
    label: "paid",
    code: "paid f041",
  },
  {
    label: "palette",
    code: "palette e40a",
  },
  {
    label: "pallet",
    code: "pallet f86a",
  },
  {
    label: "pan_tool",
    code: "pan_tool e925",
  },
  {
    label: "pan_tool_alt",
    code: "pan_tool_alt ebb9",
  },
  {
    label: "panorama",
    code: "panorama e40b",
  },
  {
    label: "panorama_fish_eye",
    code: "panorama_fish_eye e40c",
  },
  {
    label: "panorama_fisheye",
    code: "panorama_fisheye e40c",
  },
  {
    label: "panorama_horizontal",
    code: "panorama_horizontal e40d",
  },
  {
    label: "panorama_horizontal_select",
    code: "panorama_horizontal_select ef60",
  },
  {
    label: "panorama_photosphere",
    code: "panorama_photosphere e9c9",
  },
  {
    label: "panorama_photosphere_select",
    code: "panorama_photosphere_select e9ca",
  },
  {
    label: "panorama_vertical",
    code: "panorama_vertical e40e",
  },
  {
    label: "panorama_vertical_select",
    code: "panorama_vertical_select ef61",
  },
  {
    label: "panorama_wide_angle",
    code: "panorama_wide_angle e40f",
  },
  {
    label: "panorama_wide_angle_select",
    code: "panorama_wide_angle_select ef62",
  },
  {
    label: "paragliding",
    code: "paragliding e50f",
  },
  {
    label: "park",
    code: "park ea63",
  },
  {
    label: "party_mode",
    code: "party_mode e7fa",
  },
  {
    label: "password",
    code: "password f042",
  },
  {
    label: "pattern",
    code: "pattern f043",
  },
  {
    label: "pause",
    code: "pause e034",
  },
  {
    label: "pause_circle",
    code: "pause_circle e1a2",
  },
  {
    label: "pause_circle_filled",
    code: "pause_circle_filled e035",
  },
  {
    label: "pause_circle_outline",
    code: "pause_circle_outline e036",
  },
  {
    label: "pause_presentation",
    code: "pause_presentation e0ea",
  },
  {
    label: "payment",
    code: "payment e8a1",
  },
  {
    label: "payments",
    code: "payments ef63",
  },
  {
    label: "paypal",
    code: "paypal ea8d",
  },
  {
    label: "pedal_bike",
    code: "pedal_bike eb29",
  },
  {
    label: "pending",
    code: "pending ef64",
  },
  {
    label: "pending_actions",
    code: "pending_actions f1bb",
  },
  {
    label: "pentagon",
    code: "pentagon eb50",
  },
  {
    label: "people",
    code: "people e7fb",
  },
  {
    label: "people_alt",
    code: "people_alt ea21",
  },
  {
    label: "people_outline",
    code: "people_outline e7fc",
  },
  {
    label: "percent",
    code: "percent eb58",
  },
  {
    label: "perm_camera_mic",
    code: "perm_camera_mic e8a2",
  },
  {
    label: "perm_contact_cal",
    code: "perm_contact_cal e8a3",
  },
  {
    label: "perm_contact_calendar",
    code: "perm_contact_calendar e8a3",
  },
  {
    label: "perm_data_setting",
    code: "perm_data_setting e8a4",
  },
  {
    label: "perm_device_info",
    code: "perm_device_info e8a5",
  },
  {
    label: "perm_device_information",
    code: "perm_device_information e8a5",
  },
  {
    label: "perm_identity",
    code: "perm_identity e8a6",
  },
  {
    label: "perm_media",
    code: "perm_media e8a7",
  },
  {
    label: "perm_phone_msg",
    code: "perm_phone_msg e8a8",
  },
  {
    label: "perm_scan_wifi",
    code: "perm_scan_wifi e8a9",
  },
  {
    label: "person",
    code: "person e7fd",
  },
  {
    label: "person_2",
    code: "person_2 f8e4",
  },
  {
    label: "person_3",
    code: "person_3 f8e5",
  },
  {
    label: "person_4",
    code: "person_4 f8e6",
  },
  {
    label: "person_add",
    code: "person_add e7fe",
  },
  {
    label: "person_add_alt",
    code: "person_add_alt ea4d",
  },
  {
    label: "person_add_alt_1",
    code: "person_add_alt_1 ef65",
  },
  {
    label: "person_add_disabled",
    code: "person_add_disabled e9cb",
  },
  {
    label: "person_off",
    code: "person_off e510",
  },
  {
    label: "person_outline",
    code: "person_outline e7ff",
  },
  {
    label: "person_pin",
    code: "person_pin e55a",
  },
  {
    label: "person_pin_circle",
    code: "person_pin_circle e56a",
  },
  {
    label: "person_remove",
    code: "person_remove ef66",
  },
  {
    label: "person_remove_alt_1",
    code: "person_remove_alt_1 ef67",
  },
  {
    label: "person_search",
    code: "person_search f106",
  },
  {
    label: "personal_injury",
    code: "personal_injury e6da",
  },
  {
    label: "personal_video",
    code: "personal_video e63b",
  },
  {
    label: "pest_control",
    code: "pest_control f0fa",
  },
  {
    label: "pest_control_rodent",
    code: "pest_control_rodent f0fd",
  },
  {
    label: "pets",
    code: "pets e91d",
  },
  {
    label: "phishing",
    code: "phishing ead7",
  },
  {
    label: "phone",
    code: "phone e0cd",
  },
  {
    label: "phone_android",
    code: "phone_android e324",
  },
  {
    label: "phone_bluetooth_speaker",
    code: "phone_bluetooth_speaker e61b",
  },
  {
    label: "phone_callback",
    code: "phone_callback e649",
  },
  {
    label: "phone_disabled",
    code: "phone_disabled e9cc",
  },
  {
    label: "phone_enabled",
    code: "phone_enabled e9cd",
  },
  {
    label: "phone_forwarded",
    code: "phone_forwarded e61c",
  },
  {
    label: "phone_in_talk",
    code: "phone_in_talk e61d",
  },
  {
    label: "phone_iphone",
    code: "phone_iphone e325",
  },
  {
    label: "phone_locked",
    code: "phone_locked e61e",
  },
  {
    label: "phone_missed",
    code: "phone_missed e61f",
  },
  {
    label: "phone_paused",
    code: "phone_paused e620",
  },
  {
    label: "phonelink",
    code: "phonelink e326",
  },
  {
    label: "phonelink_erase",
    code: "phonelink_erase e0db",
  },
  {
    label: "phonelink_lock",
    code: "phonelink_lock e0dc",
  },
  {
    label: "phonelink_off",
    code: "phonelink_off e327",
  },
  {
    label: "phonelink_ring",
    code: "phonelink_ring e0dd",
  },
  {
    label: "phonelink_setup",
    code: "phonelink_setup e0de",
  },
  {
    label: "photo",
    code: "photo e410",
  },
  {
    label: "photo_album",
    code: "photo_album e411",
  },
  {
    label: "photo_camera",
    code: "photo_camera e412",
  },
  {
    label: "photo_camera_back",
    code: "photo_camera_back ef68",
  },
  {
    label: "photo_camera_front",
    code: "photo_camera_front ef69",
  },
  {
    label: "photo_filter",
    code: "photo_filter e43b",
  },
  {
    label: "photo_library",
    code: "photo_library e413",
  },
  {
    label: "photo_size_select_actual",
    code: "photo_size_select_actual e432",
  },
  {
    label: "photo_size_select_large",
    code: "photo_size_select_large e433",
  },
  {
    label: "photo_size_select_small",
    code: "photo_size_select_small e434",
  },
  {
    label: "php",
    code: "php eb8f",
  },
  {
    label: "piano",
    code: "piano e521",
  },
  {
    label: "piano_off",
    code: "piano_off e520",
  },
  {
    label: "picture_as_pdf",
    code: "picture_as_pdf e415",
  },
  {
    label: "picture_in_picture",
    code: "picture_in_picture e8aa",
  },
  {
    label: "picture_in_picture_alt",
    code: "picture_in_picture_alt e911",
  },
  {
    label: "pie_chart",
    code: "pie_chart e6c4",
  },
  {
    label: "pie_chart_outline",
    code: "pie_chart_outline f044",
  },
  {
    label: "pie_chart_outlined",
    code: "pie_chart_outlined e6c5",
  },
  {
    label: "pin",
    code: "pin f045",
  },
  {
    label: "pin_drop",
    code: "pin_drop e55e",
  },
  {
    label: "pin_end",
    code: "pin_end e767",
  },
  {
    label: "pin_invoke",
    code: "pin_invoke e763",
  },
  {
    label: "pinch",
    code: "pinch eb38",
  },
  {
    label: "pivot_table_chart",
    code: "pivot_table_chart e9ce",
  },
  {
    label: "pix",
    code: "pix eaa3",
  },
  {
    label: "place",
    code: "place e55f",
  },
  {
    label: "plagiarism",
    code: "plagiarism ea5a",
  },
  {
    label: "play_arrow",
    code: "play_arrow e037",
  },
  {
    label: "play_circle",
    code: "play_circle e1c4",
  },
  {
    label: "play_circle_fill",
    code: "play_circle_fill e038",
  },
  {
    label: "play_circle_filled",
    code: "play_circle_filled e038",
  },
  {
    label: "play_circle_outline",
    code: "play_circle_outline e039",
  },
  {
    label: "play_disabled",
    code: "play_disabled ef6a",
  },
  {
    label: "play_for_work",
    code: "play_for_work e906",
  },
  {
    label: "play_lesson",
    code: "play_lesson f047",
  },
  {
    label: "playlist_add",
    code: "playlist_add e03b",
  },
  {
    label: "playlist_add_check",
    code: "playlist_add_check e065",
  },
  {
    label: "playlist_add_check_circle",
    code: "playlist_add_check_circle e7e6",
  },
  {
    label: "playlist_add_circle",
    code: "playlist_add_circle e7e5",
  },
  {
    label: "playlist_play",
    code: "playlist_play e05f",
  },
  {
    label: "playlist_remove",
    code: "playlist_remove eb80",
  },
  {
    label: "plumbing",
    code: "plumbing f107",
  },
  {
    label: "plus_one",
    code: "plus_one e800",
  },
  {
    label: "podcasts",
    code: "podcasts f048",
  },
  {
    label: "point_of_sale",
    code: "point_of_sale f17e",
  },
  {
    label: "policy",
    code: "policy ea17",
  },
  {
    label: "poll",
    code: "poll e801",
  },
  {
    label: "polyline",
    code: "polyline ebbb",
  },
  {
    label: "polymer",
    code: "polymer e8ab",
  },
  {
    label: "pool",
    code: "pool eb48",
  },
  {
    label: "portable_wifi_off",
    code: "portable_wifi_off e0ce",
  },
  {
    label: "portrait",
    code: "portrait e416",
  },
  {
    label: "post_add",
    code: "post_add ea20",
  },
  {
    label: "power",
    code: "power e63c",
  },
  {
    label: "power_input",
    code: "power_input e336",
  },
  {
    label: "power_off",
    code: "power_off e646",
  },
  {
    label: "power_settings_new",
    code: "power_settings_new e8ac",
  },
  {
    label: "precision_manufacturing",
    code: "precision_manufacturing f049",
  },
  {
    label: "pregnant_woman",
    code: "pregnant_woman e91e",
  },
  {
    label: "present_to_all",
    code: "present_to_all e0df",
  },
  {
    label: "preview",
    code: "preview f1c5",
  },
  {
    label: "price_change",
    code: "price_change f04a",
  },
  {
    label: "price_check",
    code: "price_check f04b",
  },
  {
    label: "print",
    code: "print e8ad",
  },
  {
    label: "print_disabled",
    code: "print_disabled e9cf",
  },
  {
    label: "priority_high",
    code: "priority_high e645",
  },
  {
    label: "privacy_tip",
    code: "privacy_tip f0dc",
  },
  {
    label: "private_connectivity",
    code: "private_connectivity e744",
  },
  {
    label: "production_quantity_limits",
    code: "production_quantity_limits e1d1",
  },
  {
    label: "propane",
    code: "propane ec14",
  },
  {
    label: "propane_tank",
    code: "propane_tank ec13",
  },
  {
    label: "psychology",
    code: "psychology ea4a",
  },
  {
    label: "psychology_alt",
    code: "psychology_alt f8ea",
  },
  {
    label: "public",
    code: "public e80b",
  },
  {
    label: "public_off",
    code: "public_off f1ca",
  },
  {
    label: "publish",
    code: "publish e255",
  },
  {
    label: "published_with_changes",
    code: "published_with_changes f232",
  },
  {
    label: "punch_clock",
    code: "punch_clock eaa8",
  },
  {
    label: "push_pin",
    code: "push_pin f10d",
  },
  {
    label: "qr_code",
    code: "qr_code ef6b",
  },
  {
    label: "qr_code_2",
    code: "qr_code_2 e00a",
  },
  {
    label: "qr_code_scanner",
    code: "qr_code_scanner f206",
  },
  {
    label: "query_builder",
    code: "query_builder e8ae",
  },
  {
    label: "query_stats",
    code: "query_stats e4fc",
  },
  {
    label: "question_answer",
    code: "question_answer e8af",
  },
  {
    label: "question_mark",
    code: "question_mark eb8b",
  },
  {
    label: "queue",
    code: "queue e03c",
  },
  {
    label: "queue_music",
    code: "queue_music e03d",
  },
  {
    label: "queue_play_next",
    code: "queue_play_next e066",
  },
  {
    label: "quick_contacts_dialer",
    code: "quick_contacts_dialer e0cf",
  },
  {
    label: "quick_contacts_mail",
    code: "quick_contacts_mail e0d0",
  },
  {
    label: "quickreply",
    code: "quickreply ef6c",
  },
  {
    label: "quiz",
    code: "quiz f04c",
  },
  {
    label: "quora",
    code: "quora ea98",
  },
  {
    label: "r_mobiledata",
    code: "r_mobiledata f04d",
  },
  {
    label: "radar",
    code: "radar f04e",
  },
  {
    label: "radio",
    code: "radio e03e",
  },
  {
    label: "radio_button_checked",
    code: "radio_button_checked e837",
  },
  {
    label: "radio_button_off",
    code: "radio_button_off e836",
  },
  {
    label: "radio_button_on",
    code: "radio_button_on e837",
  },
  {
    label: "radio_button_unchecked",
    code: "radio_button_unchecked e836",
  },
  {
    label: "railway_alert",
    code: "railway_alert e9d1",
  },
  {
    label: "ramen_dining",
    code: "ramen_dining ea64",
  },
  {
    label: "ramp_left",
    code: "ramp_left eb9c",
  },
  {
    label: "ramp_right",
    code: "ramp_right eb96",
  },
  {
    label: "rate_review",
    code: "rate_review e560",
  },
  {
    label: "raw_off",
    code: "raw_off f04f",
  },
  {
    label: "raw_on",
    code: "raw_on f050",
  },
  {
    label: "read_more",
    code: "read_more ef6d",
  },
  {
    label: "real_estate_agent",
    code: "real_estate_agent e73a",
  },
  {
    label: "rebase_edit",
    code: "rebase_edit f846",
  },
  {
    label: "receipt",
    code: "receipt e8b0",
  },
  {
    label: "receipt_long",
    code: "receipt_long ef6e",
  },
  {
    label: "recent_actors",
    code: "recent_actors e03f",
  },
  {
    label: "recommend",
    code: "recommend e9d2",
  },
  {
    label: "record_voice_over",
    code: "record_voice_over e91f",
  },
  {
    label: "rectangle",
    code: "rectangle eb54",
  },
  {
    label: "recycling",
    code: "recycling e760",
  },
  {
    label: "reddit",
    code: "reddit eaa0",
  },
  {
    label: "redeem",
    code: "redeem e8b1",
  },
  {
    label: "redo",
    code: "redo e15a",
  },
  {
    label: "reduce_capacity",
    code: "reduce_capacity f21c",
  },
  {
    label: "refresh",
    code: "refresh e5d5",
  },
  {
    label: "remember_me",
    code: "remember_me f051",
  },
  {
    label: "remove",
    code: "remove e15b",
  },
  {
    label: "remove_circle",
    code: "remove_circle e15c",
  },
  {
    label: "remove_circle_outline",
    code: "remove_circle_outline e15d",
  },
  {
    label: "remove_done",
    code: "remove_done e9d3",
  },
  {
    label: "remove_from_queue",
    code: "remove_from_queue e067",
  },
  {
    label: "remove_moderator",
    code: "remove_moderator e9d4",
  },
  {
    label: "remove_red_eye",
    code: "remove_red_eye e417",
  },
  {
    label: "remove_road",
    code: "remove_road ebfc",
  },
  {
    label: "remove_shopping_cart",
    code: "remove_shopping_cart e928",
  },
  {
    label: "reorder",
    code: "reorder e8fe",
  },
  {
    label: "repartition",
    code: "repartition f8e8",
  },
  {
    label: "repeat",
    code: "repeat e040",
  },
  {
    label: "repeat_on",
    code: "repeat_on e9d6",
  },
  {
    label: "repeat_one",
    code: "repeat_one e041",
  },
  {
    label: "repeat_one_on",
    code: "repeat_one_on e9d7",
  },
  {
    label: "replay",
    code: "replay e042",
  },
  {
    label: "replay_10",
    code: "replay_10 e059",
  },
  {
    label: "replay_30",
    code: "replay_30 e05a",
  },
  {
    label: "replay_5",
    code: "replay_5 e05b",
  },
  {
    label: "replay_circle_filled",
    code: "replay_circle_filled e9d8",
  },
  {
    label: "reply",
    code: "reply e15e",
  },
  {
    label: "reply_all",
    code: "reply_all e15f",
  },
  {
    label: "report",
    code: "report e160",
  },
  {
    label: "report_gmailerrorred",
    code: "report_gmailerrorred f052",
  },
  {
    label: "report_off",
    code: "report_off e170",
  },
  {
    label: "report_problem",
    code: "report_problem e8b2",
  },
  {
    label: "request_page",
    code: "request_page f22c",
  },
  {
    label: "request_quote",
    code: "request_quote f1b6",
  },
  {
    label: "reset_tv",
    code: "reset_tv e9d9",
  },
  {
    label: "restart_alt",
    code: "restart_alt f053",
  },
  {
    label: "restaurant",
    code: "restaurant e56c",
  },
  {
    label: "restaurant_menu",
    code: "restaurant_menu e561",
  },
  {
    label: "restore",
    code: "restore e8b3",
  },
  {
    label: "restore_from_trash",
    code: "restore_from_trash e938",
  },
  {
    label: "restore_page",
    code: "restore_page e929",
  },
  {
    label: "reviews",
    code: "reviews f054",
  },
  {
    label: "rice_bowl",
    code: "rice_bowl f1f5",
  },
  {
    label: "ring_volume",
    code: "ring_volume e0d1",
  },
  {
    label: "rocket",
    code: "rocket eba5",
  },
  {
    label: "rocket_launch",
    code: "rocket_launch eb9b",
  },
  {
    label: "roller_shades",
    code: "roller_shades ec12",
  },
  {
    label: "roller_shades_closed",
    code: "roller_shades_closed ec11",
  },
  {
    label: "roller_skating",
    code: "roller_skating ebcd",
  },
  {
    label: "roofing",
    code: "roofing f201",
  },
  {
    label: "room",
    code: "room e8b4",
  },
  {
    label: "room_preferences",
    code: "room_preferences f1b8",
  },
  {
    label: "room_service",
    code: "room_service eb49",
  },
  {
    label: "rotate_90_degrees_ccw",
    code: "rotate_90_degrees_ccw e418",
  },
  {
    label: "rotate_90_degrees_cw",
    code: "rotate_90_degrees_cw eaab",
  },
  {
    label: "rotate_left",
    code: "rotate_left e419",
  },
  {
    label: "rotate_right",
    code: "rotate_right e41a",
  },
  {
    label: "roundabout_left",
    code: "roundabout_left eb99",
  },
  {
    label: "roundabout_right",
    code: "roundabout_right eba3",
  },
  {
    label: "rounded_corner",
    code: "rounded_corner e920",
  },
  {
    label: "route",
    code: "route eacd",
  },
  {
    label: "router",
    code: "router e328",
  },
  {
    label: "rowing",
    code: "rowing e921",
  },
  {
    label: "rss_feed",
    code: "rss_feed e0e5",
  },
  {
    label: "rsvp",
    code: "rsvp f055",
  },
  {
    label: "rtt",
    code: "rtt e9ad",
  },
  {
    label: "rule",
    code: "rule f1c2",
  },
  {
    label: "rule_folder",
    code: "rule_folder f1c9",
  },
  {
    label: "run_circle",
    code: "run_circle ef6f",
  },
  {
    label: "running_with_errors",
    code: "running_with_errors e51d",
  },
  {
    label: "rv_hookup",
    code: "rv_hookup e642",
  },
  {
    label: "safety_check",
    code: "safety_check ebef",
  },
  {
    label: "safety_divider",
    code: "safety_divider e1cc",
  },
  {
    label: "sailing",
    code: "sailing e502",
  },
  {
    label: "sanitizer",
    code: "sanitizer f21d",
  },
  {
    label: "satellite",
    code: "satellite e562",
  },
  {
    label: "satellite_alt",
    code: "satellite_alt eb3a",
  },
  {
    label: "save",
    code: "save e161",
  },
  {
    label: "save_alt",
    code: "save_alt e171",
  },
  {
    label: "save_as",
    code: "save_as eb60",
  },
  {
    label: "saved_search",
    code: "saved_search ea11",
  },
  {
    label: "savings",
    code: "savings e2eb",
  },
  {
    label: "scale",
    code: "scale eb5f",
  },
  {
    label: "scanner",
    code: "scanner e329",
  },
  {
    label: "scatter_plot",
    code: "scatter_plot e268",
  },
  {
    label: "schedule",
    code: "schedule e8b5",
  },
  {
    label: "schedule_send",
    code: "schedule_send ea0a",
  },
  {
    label: "schema",
    code: "schema e4fd",
  },
  {
    label: "school",
    code: "school e80c",
  },
  {
    label: "science",
    code: "science ea4b",
  },
  {
    label: "score",
    code: "score e269",
  },
  {
    label: "scoreboard",
    code: "scoreboard ebd0",
  },
  {
    label: "screen_lock_landscape",
    code: "screen_lock_landscape e1be",
  },
  {
    label: "screen_lock_portrait",
    code: "screen_lock_portrait e1bf",
  },
  {
    label: "screen_lock_rotation",
    code: "screen_lock_rotation e1c0",
  },
  {
    label: "screen_rotation",
    code: "screen_rotation e1c1",
  },
  {
    label: "screen_rotation_alt",
    code: "screen_rotation_alt ebee",
  },
  {
    label: "screen_search_desktop",
    code: "screen_search_desktop ef70",
  },
  {
    label: "screen_share",
    code: "screen_share e0e2",
  },
  {
    label: "screenshot",
    code: "screenshot f056",
  },
  {
    label: "screenshot_monitor",
    code: "screenshot_monitor ec08",
  },
  {
    label: "scuba_diving",
    code: "scuba_diving ebce",
  },
  {
    label: "sd",
    code: "sd e9dd",
  },
  {
    label: "sd_card",
    code: "sd_card e623",
  },
  {
    label: "sd_card_alert",
    code: "sd_card_alert f057",
  },
  {
    label: "sd_storage",
    code: "sd_storage e1c2",
  },
  {
    label: "search",
    code: "search e8b6",
  },
  {
    label: "search_off",
    code: "search_off ea76",
  },
  {
    label: "security",
    code: "security e32a",
  },
  {
    label: "security_update",
    code: "security_update f058",
  },
  {
    label: "security_update_good",
    code: "security_update_good f059",
  },
  {
    label: "security_update_warning",
    code: "security_update_warning f05a",
  },
  {
    label: "segment",
    code: "segment e94b",
  },
  {
    label: "select_all",
    code: "select_all e162",
  },
  {
    label: "self_improvement",
    code: "self_improvement ea78",
  },
  {
    label: "sell",
    code: "sell f05b",
  },
  {
    label: "send",
    code: "send e163",
  },
  {
    label: "send_and_archive",
    code: "send_and_archive ea0c",
  },
  {
    label: "send_time_extension",
    code: "send_time_extension eadb",
  },
  {
    label: "send_to_mobile",
    code: "send_to_mobile f05c",
  },
  {
    label: "sensor_door",
    code: "sensor_door f1b5",
  },
  {
    label: "sensor_occupied",
    code: "sensor_occupied ec10",
  },
  {
    label: "sensor_window",
    code: "sensor_window f1b4",
  },
  {
    label: "sensors",
    code: "sensors e51e",
  },
  {
    label: "sensors_off",
    code: "sensors_off e51f",
  },
  {
    label: "sentiment_dissatisfied",
    code: "sentiment_dissatisfied e811",
  },
  {
    label: "sentiment_neutral",
    code: "sentiment_neutral e812",
  },
  {
    label: "sentiment_satisfied",
    code: "sentiment_satisfied e813",
  },
  {
    label: "sentiment_satisfied_alt",
    code: "sentiment_satisfied_alt e0ed",
  },
  {
    label: "sentiment_very_dissatisfied",
    code: "sentiment_very_dissatisfied e814",
  },
  {
    label: "sentiment_very_satisfied",
    code: "sentiment_very_satisfied e815",
  },
  {
    label: "set_meal",
    code: "set_meal f1ea",
  },
  {
    label: "settings",
    code: "settings e8b8",
  },
  {
    label: "settings_accessibility",
    code: "settings_accessibility f05d",
  },
  {
    label: "settings_applications",
    code: "settings_applications e8b9",
  },
  {
    label: "settings_backup_restore",
    code: "settings_backup_restore e8ba",
  },
  {
    label: "settings_bluetooth",
    code: "settings_bluetooth e8bb",
  },
  {
    label: "settings_brightness",
    code: "settings_brightness e8bd",
  },
  {
    label: "settings_cell",
    code: "settings_cell e8bc",
  },
  {
    label: "settings_display",
    code: "settings_display e8bd",
  },
  {
    label: "settings_ethernet",
    code: "settings_ethernet e8be",
  },
  {
    label: "settings_input_antenna",
    code: "settings_input_antenna e8bf",
  },
  {
    label: "settings_input_component",
    code: "settings_input_component e8c0",
  },
  {
    label: "settings_input_composite",
    code: "settings_input_composite e8c1",
  },
  {
    label: "settings_input_hdmi",
    code: "settings_input_hdmi e8c2",
  },
  {
    label: "settings_input_svideo",
    code: "settings_input_svideo e8c3",
  },
  {
    label: "settings_overscan",
    code: "settings_overscan e8c4",
  },
  {
    label: "settings_phone",
    code: "settings_phone e8c5",
  },
  {
    label: "settings_power",
    code: "settings_power e8c6",
  },
  {
    label: "settings_remote",
    code: "settings_remote e8c7",
  },
  {
    label: "settings_suggest",
    code: "settings_suggest f05e",
  },
  {
    label: "settings_system_daydream",
    code: "settings_system_daydream e1c3",
  },
  {
    label: "settings_voice",
    code: "settings_voice e8c8",
  },
  {
    label: "severe_cold",
    code: "severe_cold ebd3",
  },
  {
    label: "shape_line",
    code: "shape_line f8d3",
  },
  {
    label: "share",
    code: "share e80d",
  },
  {
    label: "share_arrival_time",
    code: "share_arrival_time e524",
  },
  {
    label: "share_location",
    code: "share_location f05f",
  },
  {
    label: "shelves",
    code: "shelves f86e",
  },
  {
    label: "shield",
    code: "shield e9e0",
  },
  {
    label: "shield_moon",
    code: "shield_moon eaa9",
  },
  {
    label: "shop",
    code: "shop e8c9",
  },
  {
    label: "shop_2",
    code: "shop_2 e19e",
  },
  {
    label: "shop_two",
    code: "shop_two e8ca",
  },
  {
    label: "shopify",
    code: "shopify ea9d",
  },
  {
    label: "shopping_bag",
    code: "shopping_bag f1cc",
  },
  {
    label: "shopping_basket",
    code: "shopping_basket e8cb",
  },
  {
    label: "shopping_cart",
    code: "shopping_cart e8cc",
  },
  {
    label: "shopping_cart_checkout",
    code: "shopping_cart_checkout eb88",
  },
  {
    label: "short_text",
    code: "short_text e261",
  },
  {
    label: "shortcut",
    code: "shortcut f060",
  },
  {
    label: "show_chart",
    code: "show_chart e6e1",
  },
  {
    label: "shower",
    code: "shower f061",
  },
  {
    label: "shuffle",
    code: "shuffle e043",
  },
  {
    label: "shuffle_on",
    code: "shuffle_on e9e1",
  },
  {
    label: "shutter_speed",
    code: "shutter_speed e43d",
  },
  {
    label: "sick",
    code: "sick f220",
  },
  {
    label: "sign_language",
    code: "sign_language ebe5",
  },
  {
    label: "signal_cellular_0_bar",
    code: "signal_cellular_0_bar f0a8",
  },
  {
    label: "signal_cellular_4_bar",
    code: "signal_cellular_4_bar e1c8",
  },
  {
    label: "signal_cellular_alt",
    code: "signal_cellular_alt e202",
  },
  {
    label: "signal_cellular_alt_1_bar",
    code: "signal_cellular_alt_1_bar ebdf",
  },
  {
    label: "signal_cellular_alt_2_bar",
    code: "signal_cellular_alt_2_bar ebe3",
  },
  {
    label: "signal_cellular_connected_no_internet_0_bar",
    code: "signal_cellular_connected_no_internet_0_bar f0ac",
  },
  {
    label: "signal_cellular_connected_no_internet_4_bar",
    code: "signal_cellular_connected_no_internet_4_bar e1cd",
  },
  {
    label: "signal_cellular_no_sim",
    code: "signal_cellular_no_sim e1ce",
  },
  {
    label: "signal_cellular_nodata",
    code: "signal_cellular_nodata f062",
  },
  {
    label: "signal_cellular_null",
    code: "signal_cellular_null e1cf",
  },
  {
    label: "signal_cellular_off",
    code: "signal_cellular_off e1d0",
  },
  {
    label: "signal_wifi_0_bar",
    code: "signal_wifi_0_bar f0b0",
  },
  {
    label: "signal_wifi_4_bar",
    code: "signal_wifi_4_bar e1d8",
  },
  {
    label: "signal_wifi_4_bar_lock",
    code: "signal_wifi_4_bar_lock e1d9",
  },
  {
    label: "signal_wifi_bad",
    code: "signal_wifi_bad f063",
  },
  {
    label: "signal_wifi_connected_no_internet_4",
    code: "signal_wifi_connected_no_internet_4 f064",
  },
  {
    label: "signal_wifi_off",
    code: "signal_wifi_off e1da",
  },
  {
    label: "signal_wifi_statusbar_4_bar",
    code: "signal_wifi_statusbar_4_bar f065",
  },
  {
    label: "signal_wifi_statusbar_connected_no_internet_4",
    code: "signal_wifi_statusbar_connected_no_internet_4 f066",
  },
  {
    label: "signal_wifi_statusbar_null",
    code: "signal_wifi_statusbar_null f067",
  },
  {
    label: "signpost",
    code: "signpost eb91",
  },
  {
    label: "sim_card",
    code: "sim_card e32b",
  },
  {
    label: "sim_card_alert",
    code: "sim_card_alert e624",
  },
  {
    label: "sim_card_download",
    code: "sim_card_download f068",
  },
  {
    label: "single_bed",
    code: "single_bed ea48",
  },
  {
    label: "sip",
    code: "sip f069",
  },
  {
    label: "skateboarding",
    code: "skateboarding e511",
  },
  {
    label: "skip_next",
    code: "skip_next e044",
  },
  {
    label: "skip_previous",
    code: "skip_previous e045",
  },
  {
    label: "sledding",
    code: "sledding e512",
  },
  {
    label: "slideshow",
    code: "slideshow e41b",
  },
  {
    label: "slow_motion_video",
    code: "slow_motion_video e068",
  },
  {
    label: "smart_button",
    code: "smart_button f1c1",
  },
  {
    label: "smart_display",
    code: "smart_display f06a",
  },
  {
    label: "smart_screen",
    code: "smart_screen f06b",
  },
  {
    label: "smart_toy",
    code: "smart_toy f06c",
  },
  {
    label: "smartphone",
    code: "smartphone e32c",
  },
  {
    label: "smoke_free",
    code: "smoke_free eb4a",
  },
  {
    label: "smoking_rooms",
    code: "smoking_rooms eb4b",
  },
  {
    label: "sms",
    code: "sms e625",
  },
  {
    label: "sms_failed",
    code: "sms_failed e626",
  },
  {
    label: "snapchat",
    code: "snapchat ea6e",
  },
  {
    label: "snippet_folder",
    code: "snippet_folder f1c7",
  },
  {
    label: "snooze",
    code: "snooze e046",
  },
  {
    label: "snowboarding",
    code: "snowboarding e513",
  },
  {
    label: "snowing",
    code: "snowing e80f",
  },
  {
    label: "snowmobile",
    code: "snowmobile e503",
  },
  {
    label: "snowshoeing",
    code: "snowshoeing e514",
  },
  {
    label: "soap",
    code: "soap f1b2",
  },
  {
    label: "social_distance",
    code: "social_distance e1cb",
  },
  {
    label: "solar_power",
    code: "solar_power ec0f",
  },
  {
    label: "sort",
    code: "sort e164",
  },
  {
    label: "sort_by_alpha",
    code: "sort_by_alpha e053",
  },
  {
    label: "sos",
    code: "sos ebf7",
  },
  {
    label: "soup_kitchen",
    code: "soup_kitchen e7d3",
  },
  {
    label: "source",
    code: "source f1c4",
  },
  {
    label: "south",
    code: "south f1e3",
  },
  {
    label: "south_america",
    code: "south_america e7e4",
  },
  {
    label: "south_east",
    code: "south_east f1e4",
  },
  {
    label: "south_west",
    code: "south_west f1e5",
  },
  {
    label: "spa",
    code: "spa eb4c",
  },
  {
    label: "space_bar",
    code: "space_bar e256",
  },
  {
    label: "space_dashboard",
    code: "space_dashboard e66b",
  },
  {
    label: "spatial_audio",
    code: "spatial_audio ebeb",
  },
  {
    label: "spatial_audio_off",
    code: "spatial_audio_off ebe8",
  },
  {
    label: "spatial_tracking",
    code: "spatial_tracking ebea",
  },
  {
    label: "speaker",
    code: "speaker e32d",
  },
  {
    label: "speaker_group",
    code: "speaker_group e32e",
  },
  {
    label: "speaker_notes",
    code: "speaker_notes e8cd",
  },
  {
    label: "speaker_notes_off",
    code: "speaker_notes_off e92a",
  },
  {
    label: "speaker_phone",
    code: "speaker_phone e0d2",
  },
  {
    label: "speed",
    code: "speed e9e4",
  },
  {
    label: "spellcheck",
    code: "spellcheck e8ce",
  },
  {
    label: "splitscreen",
    code: "splitscreen f06d",
  },
  {
    label: "spoke",
    code: "spoke e9a7",
  },
  {
    label: "sports",
    code: "sports ea30",
  },
  {
    label: "sports_bar",
    code: "sports_bar f1f3",
  },
  {
    label: "sports_baseball",
    code: "sports_baseball ea51",
  },
  {
    label: "sports_basketball",
    code: "sports_basketball ea26",
  },
  {
    label: "sports_cricket",
    code: "sports_cricket ea27",
  },
  {
    label: "sports_esports",
    code: "sports_esports ea28",
  },
  {
    label: "sports_football",
    code: "sports_football ea29",
  },
  {
    label: "sports_golf",
    code: "sports_golf ea2a",
  },
  {
    label: "sports_gymnastics",
    code: "sports_gymnastics ebc4",
  },
  {
    label: "sports_handball",
    code: "sports_handball ea33",
  },
  {
    label: "sports_hockey",
    code: "sports_hockey ea2b",
  },
  {
    label: "sports_kabaddi",
    code: "sports_kabaddi ea34",
  },
  {
    label: "sports_martial_arts",
    code: "sports_martial_arts eae9",
  },
  {
    label: "sports_mma",
    code: "sports_mma ea2c",
  },
  {
    label: "sports_motorsports",
    code: "sports_motorsports ea2d",
  },
  {
    label: "sports_rugby",
    code: "sports_rugby ea2e",
  },
  {
    label: "sports_score",
    code: "sports_score f06e",
  },
  {
    label: "sports_soccer",
    code: "sports_soccer ea2f",
  },
  {
    label: "sports_tennis",
    code: "sports_tennis ea32",
  },
  {
    label: "sports_volleyball",
    code: "sports_volleyball ea31",
  },
  {
    label: "square",
    code: "square eb36",
  },
  {
    label: "square_foot",
    code: "square_foot ea49",
  },
  {
    label: "ssid_chart",
    code: "ssid_chart eb66",
  },
  {
    label: "stacked_bar_chart",
    code: "stacked_bar_chart e9e6",
  },
  {
    label: "stacked_line_chart",
    code: "stacked_line_chart f22b",
  },
  {
    label: "stadium",
    code: "stadium eb90",
  },
  {
    label: "stairs",
    code: "stairs f1a9",
  },
  {
    label: "star",
    code: "star e838",
  },
  {
    label: "star_border",
    code: "star_border e83a",
  },
  {
    label: "star_border_purple500",
    code: "star_border_purple500 f099",
  },
  {
    label: "star_half",
    code: "star_half e839",
  },
  {
    label: "star_outline",
    code: "star_outline f06f",
  },
  {
    label: "star_purple500",
    code: "star_purple500 f09a",
  },
  {
    label: "star_rate",
    code: "star_rate f0ec",
  },
  {
    label: "stars",
    code: "stars e8d0",
  },
  {
    label: "start",
    code: "start e089",
  },
  {
    label: "stay_current_landscape",
    code: "stay_current_landscape e0d3",
  },
  {
    label: "stay_current_portrait",
    code: "stay_current_portrait e0d4",
  },
  {
    label: "stay_primary_landscape",
    code: "stay_primary_landscape e0d5",
  },
  {
    label: "stay_primary_portrait",
    code: "stay_primary_portrait e0d6",
  },
  {
    label: "sticky_note_2",
    code: "sticky_note_2 f1fc",
  },
  {
    label: "stop",
    code: "stop e047",
  },
  {
    label: "stop_circle",
    code: "stop_circle ef71",
  },
  {
    label: "stop_screen_share",
    code: "stop_screen_share e0e3",
  },
  {
    label: "storage",
    code: "storage e1db",
  },
  {
    label: "store",
    code: "store e8d1",
  },
  {
    label: "store_mall_directory",
    code: "store_mall_directory e563",
  },
  {
    label: "storefront",
    code: "storefront ea12",
  },
  {
    label: "storm",
    code: "storm f070",
  },
  {
    label: "straight",
    code: "straight eb95",
  },
  {
    label: "straighten",
    code: "straighten e41c",
  },
  {
    label: "stream",
    code: "stream e9e9",
  },
  {
    label: "streetview",
    code: "streetview e56e",
  },
  {
    label: "strikethrough_s",
    code: "strikethrough_s e257",
  },
  {
    label: "stroller",
    code: "stroller f1ae",
  },
  {
    label: "style",
    code: "style e41d",
  },
  {
    label: "subdirectory_arrow_left",
    code: "subdirectory_arrow_left e5d9",
  },
  {
    label: "subdirectory_arrow_right",
    code: "subdirectory_arrow_right e5da",
  },
  {
    label: "subject",
    code: "subject e8d2",
  },
  {
    label: "subscript",
    code: "subscript f111",
  },
  {
    label: "subscriptions",
    code: "subscriptions e064",
  },
  {
    label: "subtitles",
    code: "subtitles e048",
  },
  {
    label: "subtitles_off",
    code: "subtitles_off ef72",
  },
  {
    label: "subway",
    code: "subway e56f",
  },
  {
    label: "summarize",
    code: "summarize f071",
  },
  {
    label: "sunny",
    code: "sunny e81a",
  },
  {
    label: "sunny_snowing",
    code: "sunny_snowing e819",
  },
  {
    label: "superscript",
    code: "superscript f112",
  },
  {
    label: "supervised_user_circle",
    code: "supervised_user_circle e939",
  },
  {
    label: "supervisor_account",
    code: "supervisor_account e8d3",
  },
  {
    label: "support",
    code: "support ef73",
  },
  {
    label: "support_agent",
    code: "support_agent f0e2",
  },
  {
    label: "surfing",
    code: "surfing e515",
  },
  {
    label: "surround_sound",
    code: "surround_sound e049",
  },
  {
    label: "swap_calls",
    code: "swap_calls e0d7",
  },
  {
    label: "swap_horiz",
    code: "swap_horiz e8d4",
  },
  {
    label: "swap_horizontal_circle",
    code: "swap_horizontal_circle e933",
  },
  {
    label: "swap_vert",
    code: "swap_vert e8d5",
  },
  {
    label: "swap_vert_circle",
    code: "swap_vert_circle e8d6",
  },
  {
    label: "swap_vertical_circle",
    code: "swap_vertical_circle e8d6",
  },
  {
    label: "swipe",
    code: "swipe e9ec",
  },
  {
    label: "swipe_down",
    code: "swipe_down eb53",
  },
  {
    label: "swipe_down_alt",
    code: "swipe_down_alt eb30",
  },
  {
    label: "swipe_left",
    code: "swipe_left eb59",
  },
  {
    label: "swipe_left_alt",
    code: "swipe_left_alt eb33",
  },
  {
    label: "swipe_right",
    code: "swipe_right eb52",
  },
  {
    label: "swipe_right_alt",
    code: "swipe_right_alt eb56",
  },
  {
    label: "swipe_up",
    code: "swipe_up eb2e",
  },
  {
    label: "swipe_up_alt",
    code: "swipe_up_alt eb35",
  },
  {
    label: "swipe_vertical",
    code: "swipe_vertical eb51",
  },
  {
    label: "switch_access_shortcut",
    code: "switch_access_shortcut e7e1",
  },
  {
    label: "switch_access_shortcut_add",
    code: "switch_access_shortcut_add e7e2",
  },
  {
    label: "switch_account",
    code: "switch_account e9ed",
  },
  {
    label: "switch_camera",
    code: "switch_camera e41e",
  },
  {
    label: "switch_left",
    code: "switch_left f1d1",
  },
  {
    label: "switch_right",
    code: "switch_right f1d2",
  },
  {
    label: "switch_video",
    code: "switch_video e41f",
  },
  {
    label: "synagogue",
    code: "synagogue eab0",
  },
  {
    label: "sync",
    code: "sync e627",
  },
  {
    label: "sync_alt",
    code: "sync_alt ea18",
  },
  {
    label: "sync_disabled",
    code: "sync_disabled e628",
  },
  {
    label: "sync_lock",
    code: "sync_lock eaee",
  },
  {
    label: "sync_problem",
    code: "sync_problem e629",
  },
  {
    label: "system_security_update",
    code: "system_security_update f072",
  },
  {
    label: "system_security_update_good",
    code: "system_security_update_good f073",
  },
  {
    label: "system_security_update_warning",
    code: "system_security_update_warning f074",
  },
  {
    label: "system_update",
    code: "system_update e62a",
  },
  {
    label: "system_update_alt",
    code: "system_update_alt e8d7",
  },
  {
    label: "system_update_tv",
    code: "system_update_tv e8d7",
  },
  {
    label: "tab",
    code: "tab e8d8",
  },
  {
    label: "tab_unselected",
    code: "tab_unselected e8d9",
  },
  {
    label: "table_bar",
    code: "table_bar ead2",
  },
  {
    label: "table_chart",
    code: "table_chart e265",
  },
  {
    label: "table_restaurant",
    code: "table_restaurant eac6",
  },
  {
    label: "table_rows",
    code: "table_rows f101",
  },
  {
    label: "table_view",
    code: "table_view f1be",
  },
  {
    label: "tablet",
    code: "tablet e32f",
  },
  {
    label: "tablet_android",
    code: "tablet_android e330",
  },
  {
    label: "tablet_mac",
    code: "tablet_mac e331",
  },
  {
    label: "tag",
    code: "tag e9ef",
  },
  {
    label: "tag_faces",
    code: "tag_faces e420",
  },
  {
    label: "takeout_dining",
    code: "takeout_dining ea74",
  },
  {
    label: "tap_and_play",
    code: "tap_and_play e62b",
  },
  {
    label: "tapas",
    code: "tapas f1e9",
  },
  {
    label: "task",
    code: "task f075",
  },
  {
    label: "task_alt",
    code: "task_alt e2e6",
  },
  {
    label: "taxi_alert",
    code: "taxi_alert ef74",
  },
  {
    label: "telegram",
    code: "telegram ea6b",
  },
  {
    label: "temple_buddhist",
    code: "temple_buddhist eab3",
  },
  {
    label: "temple_hindu",
    code: "temple_hindu eaaf",
  },
  {
    label: "terminal",
    code: "terminal eb8e",
  },
  {
    label: "terrain",
    code: "terrain e564",
  },
  {
    label: "text_decrease",
    code: "text_decrease eadd",
  },
  {
    label: "text_fields",
    code: "text_fields e262",
  },
  {
    label: "text_format",
    code: "text_format e165",
  },
  {
    label: "text_increase",
    code: "text_increase eae2",
  },
  {
    label: "text_rotate_up",
    code: "text_rotate_up e93a",
  },
  {
    label: "text_rotate_vertical",
    code: "text_rotate_vertical e93b",
  },
  {
    label: "text_rotation_angledown",
    code: "text_rotation_angledown e93c",
  },
  {
    label: "text_rotation_angleup",
    code: "text_rotation_angleup e93d",
  },
  {
    label: "text_rotation_down",
    code: "text_rotation_down e93e",
  },
  {
    label: "text_rotation_none",
    code: "text_rotation_none e93f",
  },
  {
    label: "text_snippet",
    code: "text_snippet f1c6",
  },
  {
    label: "textsms",
    code: "textsms e0d8",
  },
  {
    label: "texture",
    code: "texture e421",
  },
  {
    label: "theater_comedy",
    code: "theater_comedy ea66",
  },
  {
    label: "theaters",
    code: "theaters e8da",
  },
  {
    label: "thermostat",
    code: "thermostat f076",
  },
  {
    label: "thermostat_auto",
    code: "thermostat_auto f077",
  },
  {
    label: "thumb_down",
    code: "thumb_down e8db",
  },
  {
    label: "thumb_down_alt",
    code: "thumb_down_alt e816",
  },
  {
    label: "thumb_down_off_alt",
    code: "thumb_down_off_alt e9f2",
  },
  {
    label: "thumb_up",
    code: "thumb_up e8dc",
  },
  {
    label: "thumb_up_alt",
    code: "thumb_up_alt e817",
  },
  {
    label: "thumb_up_off_alt",
    code: "thumb_up_off_alt e9f3",
  },
  {
    label: "thumbs_up_down",
    code: "thumbs_up_down e8dd",
  },
  {
    label: "thunderstorm",
    code: "thunderstorm ebdb",
  },
  {
    label: "tiktok",
    code: "tiktok ea7e",
  },
  {
    label: "time_to_leave",
    code: "time_to_leave e62c",
  },
  {
    label: "timelapse",
    code: "timelapse e422",
  },
  {
    label: "timeline",
    code: "timeline e922",
  },
  {
    label: "timer",
    code: "timer e425",
  },
  {
    label: "timer_10",
    code: "timer_10 e423",
  },
  {
    label: "timer_10_select",
    code: "timer_10_select f07a",
  },
  {
    label: "timer_3",
    code: "timer_3 e424",
  },
  {
    label: "timer_3_select",
    code: "timer_3_select f07b",
  },
  {
    label: "timer_off",
    code: "timer_off e426",
  },
  {
    label: "tips_and_updates",
    code: "tips_and_updates e79a",
  },
  {
    label: "tire_repair",
    code: "tire_repair ebc8",
  },
  {
    label: "title",
    code: "title e264",
  },
  {
    label: "toc",
    code: "toc e8de",
  },
  {
    label: "today",
    code: "today e8df",
  },
  {
    label: "toggle_off",
    code: "toggle_off e9f5",
  },
  {
    label: "toggle_on",
    code: "toggle_on e9f6",
  },
  {
    label: "token",
    code: "token ea25",
  },
  {
    label: "toll",
    code: "toll e8e0",
  },
  {
    label: "tonality",
    code: "tonality e427",
  },
  {
    label: "topic",
    code: "topic f1c8",
  },
  {
    label: "tornado",
    code: "tornado e199",
  },
  {
    label: "touch_app",
    code: "touch_app e913",
  },
  {
    label: "tour",
    code: "tour ef75",
  },
  {
    label: "toys",
    code: "toys e332",
  },
  {
    label: "track_changes",
    code: "track_changes e8e1",
  },
  {
    label: "traffic",
    code: "traffic e565",
  },
  {
    label: "train",
    code: "train e570",
  },
  {
    label: "tram",
    code: "tram e571",
  },
  {
    label: "transcribe",
    code: "transcribe f8ec",
  },
  {
    label: "transfer_within_a_station",
    code: "transfer_within_a_station e572",
  },
  {
    label: "transform",
    code: "transform e428",
  },
  {
    label: "transgender",
    code: "transgender e58d",
  },
  {
    label: "transit_enterexit",
    code: "transit_enterexit e579",
  },
  {
    label: "translate",
    code: "translate e8e2",
  },
  {
    label: "travel_explore",
    code: "travel_explore e2db",
  },
  {
    label: "trending_down",
    code: "trending_down e8e3",
  },
  {
    label: "trending_flat",
    code: "trending_flat e8e4",
  },
  {
    label: "trending_neutral",
    code: "trending_neutral e8e4",
  },
  {
    label: "trending_up",
    code: "trending_up e8e5",
  },
  {
    label: "trip_origin",
    code: "trip_origin e57b",
  },
  {
    label: "trolley",
    code: "trolley f86b",
  },
  {
    label: "troubleshoot",
    code: "troubleshoot e1d2",
  },
  {
    label: "try",
    code: "try f07c",
  },
  {
    label: "tsunami",
    code: "tsunami ebd8",
  },
  {
    label: "tty",
    code: "tty f1aa",
  },
  {
    label: "tune",
    code: "tune e429",
  },
  {
    label: "tungsten",
    code: "tungsten f07d",
  },
  {
    label: "turn_left",
    code: "turn_left eba6",
  },
  {
    label: "turn_right",
    code: "turn_right ebab",
  },
  {
    label: "turn_sharp_left",
    code: "turn_sharp_left eba7",
  },
  {
    label: "turn_sharp_right",
    code: "turn_sharp_right ebaa",
  },
  {
    label: "turn_slight_left",
    code: "turn_slight_left eba4",
  },
  {
    label: "turn_slight_right",
    code: "turn_slight_right eb9a",
  },
  {
    label: "turned_in",
    code: "turned_in e8e6",
  },
  {
    label: "turned_in_not",
    code: "turned_in_not e8e7",
  },
  {
    label: "tv",
    code: "tv e333",
  },
  {
    label: "tv_off",
    code: "tv_off e647",
  },
  {
    label: "two_wheeler",
    code: "two_wheeler e9f9",
  },
  {
    label: "type_specimen",
    code: "type_specimen f8f0",
  },
  {
    label: "u_turn_left",
    code: "u_turn_left eba1",
  },
  {
    label: "u_turn_right",
    code: "u_turn_right eba2",
  },
  {
    label: "umbrella",
    code: "umbrella f1ad",
  },
  {
    label: "unarchive",
    code: "unarchive e169",
  },
  {
    label: "undo",
    code: "undo e166",
  },
  {
    label: "unfold_less",
    code: "unfold_less e5d6",
  },
  {
    label: "unfold_less_double",
    code: "unfold_less_double f8cf",
  },
  {
    label: "unfold_more",
    code: "unfold_more e5d7",
  },
  {
    label: "unfold_more_double",
    code: "unfold_more_double f8d0",
  },
  {
    label: "unpublished",
    code: "unpublished f236",
  },
  {
    label: "unsubscribe",
    code: "unsubscribe e0eb",
  },
  {
    label: "upcoming",
    code: "upcoming f07e",
  },
  {
    label: "update",
    code: "update e923",
  },
  {
    label: "update_disabled",
    code: "update_disabled e075",
  },
  {
    label: "upgrade",
    code: "upgrade f0fb",
  },
  {
    label: "upload",
    code: "upload f09b",
  },
  {
    label: "upload_file",
    code: "upload_file e9fc",
  },
  {
    label: "usb",
    code: "usb e1e0",
  },
  {
    label: "usb_off",
    code: "usb_off e4fa",
  },
  {
    label: "vaccines",
    code: "vaccines e138",
  },
  {
    label: "vape_free",
    code: "vape_free ebc6",
  },
  {
    label: "vaping_rooms",
    code: "vaping_rooms ebcf",
  },
  {
    label: "verified",
    code: "verified ef76",
  },
  {
    label: "verified_user",
    code: "verified_user e8e8",
  },
  {
    label: "vertical_align_bottom",
    code: "vertical_align_bottom e258",
  },
  {
    label: "vertical_align_center",
    code: "vertical_align_center e259",
  },
  {
    label: "vertical_align_top",
    code: "vertical_align_top e25a",
  },
  {
    label: "vertical_distribute",
    code: "vertical_distribute e076",
  },
  {
    label: "vertical_shades",
    code: "vertical_shades ec0e",
  },
  {
    label: "vertical_shades_closed",
    code: "vertical_shades_closed ec0d",
  },
  {
    label: "vertical_split",
    code: "vertical_split e949",
  },
  {
    label: "vibration",
    code: "vibration e62d",
  },
  {
    label: "video_call",
    code: "video_call e070",
  },
  {
    label: "video_camera_back",
    code: "video_camera_back f07f",
  },
  {
    label: "video_camera_front",
    code: "video_camera_front f080",
  },
  {
    label: "video_chat",
    code: "video_chat f8a0",
  },
  {
    label: "video_collection",
    code: "video_collection e04a",
  },
  {
    label: "video_file",
    code: "video_file eb87",
  },
  {
    label: "video_label",
    code: "video_label e071",
  },
  {
    label: "video_library",
    code: "video_library e04a",
  },
  {
    label: "video_settings",
    code: "video_settings ea75",
  },
  {
    label: "video_stable",
    code: "video_stable f081",
  },
  {
    label: "videocam",
    code: "videocam e04b",
  },
  {
    label: "videocam_off",
    code: "videocam_off e04c",
  },
  {
    label: "videogame_asset",
    code: "videogame_asset e338",
  },
  {
    label: "videogame_asset_off",
    code: "videogame_asset_off e500",
  },
  {
    label: "view_agenda",
    code: "view_agenda e8e9",
  },
  {
    label: "view_array",
    code: "view_array e8ea",
  },
  {
    label: "view_carousel",
    code: "view_carousel e8eb",
  },
  {
    label: "view_column",
    code: "view_column e8ec",
  },
  {
    label: "view_comfortable",
    code: "view_comfortable e42a",
  },
  {
    label: "view_comfy",
    code: "view_comfy e42a",
  },
  {
    label: "view_comfy_alt",
    code: "view_comfy_alt eb73",
  },
  {
    label: "view_compact",
    code: "view_compact e42b",
  },
  {
    label: "view_compact_alt",
    code: "view_compact_alt eb74",
  },
  {
    label: "view_cozy",
    code: "view_cozy eb75",
  },
  {
    label: "view_day",
    code: "view_day e8ed",
  },
  {
    label: "view_headline",
    code: "view_headline e8ee",
  },
  {
    label: "view_in_ar",
    code: "view_in_ar e9fe",
  },
  {
    label: "view_kanban",
    code: "view_kanban eb7f",
  },
  {
    label: "view_list",
    code: "view_list e8ef",
  },
  {
    label: "view_module",
    code: "view_module e8f0",
  },
  {
    label: "view_quilt",
    code: "view_quilt e8f1",
  },
  {
    label: "view_sidebar",
    code: "view_sidebar f114",
  },
  {
    label: "view_stream",
    code: "view_stream e8f2",
  },
  {
    label: "view_timeline",
    code: "view_timeline eb85",
  },
  {
    label: "view_week",
    code: "view_week e8f3",
  },
  {
    label: "vignette",
    code: "vignette e435",
  },
  {
    label: "villa",
    code: "villa e586",
  },
  {
    label: "visibility",
    code: "visibility e8f4",
  },
  {
    label: "visibility_off",
    code: "visibility_off e8f5",
  },
  {
    label: "voice_chat",
    code: "voice_chat e62e",
  },
  {
    label: "voice_over_off",
    code: "voice_over_off e94a",
  },
  {
    label: "voicemail",
    code: "voicemail e0d9",
  },
  {
    label: "volcano",
    code: "volcano ebda",
  },
  {
    label: "volume_down",
    code: "volume_down e04d",
  },
  {
    label: "volume_down_alt",
    code: "volume_down_alt e79c",
  },
  {
    label: "volume_mute",
    code: "volume_mute e04e",
  },
  {
    label: "volume_off",
    code: "volume_off e04f",
  },
  {
    label: "volume_up",
    code: "volume_up e050",
  },
  {
    label: "volunteer_activism",
    code: "volunteer_activism ea70",
  },
  {
    label: "vpn_key",
    code: "vpn_key e0da",
  },
  {
    label: "vpn_key_off",
    code: "vpn_key_off eb7a",
  },
  {
    label: "vpn_lock",
    code: "vpn_lock e62f",
  },
  {
    label: "vrpano",
    code: "vrpano f082",
  },
  {
    label: "wallet",
    code: "wallet f8ff",
  },
  {
    label: "wallet_giftcard",
    code: "wallet_giftcard e8f6",
  },
  {
    label: "wallet_membership",
    code: "wallet_membership e8f7",
  },
  {
    label: "wallet_travel",
    code: "wallet_travel e8f8",
  },
  {
    label: "wallpaper",
    code: "wallpaper e1bc",
  },
  {
    label: "warehouse",
    code: "warehouse ebb8",
  },
  {
    label: "warning",
    code: "warning e002",
  },
  {
    label: "warning_amber",
    code: "warning_amber f083",
  },
  {
    label: "wash",
    code: "wash f1b1",
  },
  {
    label: "watch",
    code: "watch e334",
  },
  {
    label: "watch_later",
    code: "watch_later e924",
  },
  {
    label: "watch_off",
    code: "watch_off eae3",
  },
  {
    label: "water",
    code: "water f084",
  },
  {
    label: "water_damage",
    code: "water_damage f203",
  },
  {
    label: "water_drop",
    code: "water_drop e798",
  },
  {
    label: "waterfall_chart",
    code: "waterfall_chart ea00",
  },
  {
    label: "waves",
    code: "waves e176",
  },
  {
    label: "waving_hand",
    code: "waving_hand e766",
  },
  {
    label: "wb_auto",
    code: "wb_auto e42c",
  },
  {
    label: "wb_cloudy",
    code: "wb_cloudy e42d",
  },
  {
    label: "wb_incandescent",
    code: "wb_incandescent e42e",
  },
  {
    label: "wb_iridescent",
    code: "wb_iridescent e436",
  },
  {
    label: "wb_shade",
    code: "wb_shade ea01",
  },
  {
    label: "wb_sunny",
    code: "wb_sunny e430",
  },
  {
    label: "wb_twighlight",
    code: "wb_twighlight ea02",
  },
  {
    label: "wb_twilight",
    code: "wb_twilight e1c6",
  },
  {
    label: "wc",
    code: "wc e63d",
  },
  {
    label: "web",
    code: "web e051",
  },
  {
    label: "web_asset",
    code: "web_asset e069",
  },
  {
    label: "web_asset_off",
    code: "web_asset_off e4f7",
  },
  {
    label: "web_stories",
    code: "web_stories e595",
  },
  {
    label: "webhook",
    code: "webhook eb92",
  },
  {
    label: "wechat",
    code: "wechat ea81",
  },
  {
    label: "weekend",
    code: "weekend e16b",
  },
  {
    label: "west",
    code: "west f1e6",
  },
  {
    label: "whatshot",
    code: "whatshot e80e",
  },
  {
    label: "wheelchair_pickup",
    code: "wheelchair_pickup f1ab",
  },
  {
    label: "where_to_vote",
    code: "where_to_vote e177",
  },
  {
    label: "widgets",
    code: "widgets e1bd",
  },
  {
    label: "width_full",
    code: "width_full f8f5",
  },
  {
    label: "width_normal",
    code: "width_normal f8f6",
  },
  {
    label: "width_wide",
    code: "width_wide f8f7",
  },
  {
    label: "wifi",
    code: "wifi e63e",
  },
  {
    label: "wifi_1_bar",
    code: "wifi_1_bar e4ca",
  },
  {
    label: "wifi_2_bar",
    code: "wifi_2_bar e4d9",
  },
  {
    label: "wifi_calling",
    code: "wifi_calling ef77",
  },
  {
    label: "wifi_calling_3",
    code: "wifi_calling_3 f085",
  },
  {
    label: "wifi_channel",
    code: "wifi_channel eb6a",
  },
  {
    label: "wifi_find",
    code: "wifi_find eb31",
  },
  {
    label: "wifi_lock",
    code: "wifi_lock e1e1",
  },
  {
    label: "wifi_off",
    code: "wifi_off e648",
  },
  {
    label: "wifi_password",
    code: "wifi_password eb6b",
  },
  {
    label: "wifi_protected_setup",
    code: "wifi_protected_setup f0fc",
  },
  {
    label: "wifi_tethering",
    code: "wifi_tethering e1e2",
  },
  {
    label: "wifi_tethering_error",
    code: "wifi_tethering_error ead9",
  },
  {
    label: "wifi_tethering_error_rounded",
    code: "wifi_tethering_error_rounded f086",
  },
  {
    label: "wifi_tethering_off",
    code: "wifi_tethering_off f087",
  },
  {
    label: "wind_power",
    code: "wind_power ec0c",
  },
  {
    label: "window",
    code: "window f088",
  },
  {
    label: "wine_bar",
    code: "wine_bar f1e8",
  },
  {
    label: "woman",
    code: "woman e13e",
  },
  {
    label: "woman_2",
    code: "woman_2 f8e7",
  },
  {
    label: "woo_commerce",
    code: "woo_commerce ea6d",
  },
  {
    label: "wordpress",
    code: "wordpress ea9f",
  },
  {
    label: "work",
    code: "work e8f9",
  },
  {
    label: "work_history",
    code: "work_history ec09",
  },
  {
    label: "work_off",
    code: "work_off e942",
  },
  {
    label: "work_outline",
    code: "work_outline e943",
  },
  {
    label: "workspace_premium",
    code: "workspace_premium e7af",
  },
  {
    label: "workspaces",
    code: "workspaces e1a0",
  },
  {
    label: "workspaces_filled",
    code: "workspaces_filled ea0d",
  },
  {
    label: "workspaces_outline",
    code: "workspaces_outline ea0f",
  },
  {
    label: "wrap_text",
    code: "wrap_text e25b",
  },
  {
    label: "wrong_location",
    code: "wrong_location ef78",
  },
  {
    label: "wysiwyg",
    code: "wysiwyg f1c3",
  },
  {
    label: "yard",
    code: "yard f089",
  },
  {
    label: "youtube_searched_for",
    code: "youtube_searched_for e8fa",
  },
  {
    label: "zoom_in",
    code: "zoom_in e8ff",
  },
  {
    label: "zoom_in_map",
    code: "zoom_in_map eb2d",
  },
  {
    label: "zoom_out",
    code: "zoom_out e900",
  },
  {
    label: "zoom_out_map",
    code: "zoom_out_map e56b",
  },
];
