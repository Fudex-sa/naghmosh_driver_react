import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { AppView, AppText, AppImage, AppScrollView } from "../../common";
import { AppHeader } from "../../components";

const bg = require("../../assets/imgs/aboutUsBg.png");

const textContent = `لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت" (Letraset) البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل "ألدوس بايج مايكر" (Aldus PageMaker) والتي حوت أيضاً على نسخ من نص لوريم إيبسوم.

`;
class AboutBalsam extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title="عن التطبيق" transparent />
        <AppScrollView stretch>
          {/* <AppImage stretch height={28} source={bg} /> */}
          <AppView stretch marginHorizontal={5} padding={10} center>
            <AppText>{textContent}</AppText>
          </AppView>
        </AppScrollView>
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(AboutBalsam);
