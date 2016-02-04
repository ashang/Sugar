namespace('Date | Simplified Chinese', function () {
  'use strict';

  var now, then;

  setup(function() {
    now = new Date();
    then = new Date(2010, 0, 5, 15, 52);
    testSetLocale('zh-CN');
  });

  method('create', function() {

    equal(testCreateDate('2011年5月15日'), new Date(2011, 4, 15), 'Date#create | basic Simplified Chinese date');
    equal(testCreateDate('2011年5月'), new Date(2011, 4), 'year and month');
    equal(testCreateDate('5月15日'), new Date(now.getFullYear(), 4, 15), 'month and date');
    equal(testCreateDate('2011年'), new Date(2011, 0), 'year');
    equal(testCreateDate('2016年2月02日'), new Date(2016, 1, 2), 'toLocaleDateString');

    equal(testCreateDate('5月'), new Date(now.getFullYear(), 4), 'month');
    equal(testCreateDate('15日'), new Date(now.getFullYear(), now.getMonth(), 15), 'date');
    equal(testCreateDate('星期一'), getDateWithWeekdayAndOffset(1), 'Monday');
    equal(testCreateDate('星期天'), getDateWithWeekdayAndOffset(0), 'Sunday');

    equal(testCreateDate('九日'), new Date(now.getFullYear(), now.getMonth(), 9), 'the 9th');
    equal(testCreateDate('二十五日'), new Date(now.getFullYear(), now.getMonth(), 25), 'the 25th');
    equal(testCreateDate('二十五号'), new Date(now.getFullYear(), now.getMonth(), 25), '号 should be understood as well');
    equal(testCreateDate('九月二十五号'), new Date(now.getFullYear(), 8, 25), '9.25');

    equal(testCreateDate('2011年5月15日 3:45'), new Date(2011, 4, 15, 3, 45), 'Date#create | basic Simplified Chinese date 3:45');
    equal(testCreateDate('2011年5月15日 下午3:45'), new Date(2011, 4, 15, 15, 45), 'Date#create | basic Simplified Chinese date 3:45pm');
    equal(testCreateDate('2011年5月15日 3点45分钟'), new Date(2011, 4, 15, 3, 45), 'Date#create | basic Simplified Chinese date 3:45pm kanji');
    equal(testCreateDate('2011年5月15日 下午3点45分钟'), new Date(2011, 4, 15, 15, 45), 'Date#create | basic Simplified Chinese date 3:45pm kanji afternoon');

    equal(testCreateDate('一毫秒前'), getRelativeDate(null, null, null, null, null, null,-1), 'one millisecond ago');
    equal(testCreateDate('一秒钟前'), getRelativeDate(null, null, null, null, null, -1), 'one second ago');
    equal(testCreateDate('一分钟前'), getRelativeDate(null, null, null, null, -1), 'one minute ago');
    equal(testCreateDate('一小时前'), getRelativeDate(null, null, null, -1), 'one hour ago');
    equal(testCreateDate('一天前'), getRelativeDate(null, null, -1), 'one day ago');
    equal(testCreateDate('一周前'), getRelativeDate(null, null, -7), 'one week 周');
    equal(testCreateDate('一个星期前'), getRelativeDate(null, null, -7), 'one week 个星期');
    equal(testCreateDate('一个月前'), getRelativeDate(null, -1), 'one month ago');
    equal(testCreateDate('一年前'), getRelativeDate(-1), 'one year ago');


    equal(testCreateDate('5毫秒后'), getRelativeDate(null, null, null, null, null, null,5), 'five millisecond from now');
    equal(testCreateDate('5秒钟后'), getRelativeDate(null, null, null, null, null, 5), 'five second from now');
    equal(testCreateDate('5分钟后'), getRelativeDate(null, null, null, null, 5), 'five minute from now');
    equal(testCreateDate('5小时后'), getRelativeDate(null, null, null, 5), 'five hour from now');
    equal(testCreateDate('5天后'), getRelativeDate(null, null, 5), 'five day from now');
    equal(testCreateDate('5周后'), getRelativeDate(null, null, 35), 'five weeks from now 周');
    equal(testCreateDate('5个星期后'), getRelativeDate(null, null, 35), 'five weeks from now 个星期');
    equal(testCreateDate('5个月后'), getRelativeDate(null, 5), 'five months');
    equal(testCreateDate('5年后'), getRelativeDate(5), 'five years from now');

    equal(testCreateDate('２０１１年'), new Date(2011, 0), 'full-width year');
    equal(testCreateDate('星期三'), getDateWithWeekdayAndOffset(3, 0), '星期 Wednesday');

    equal(testCreateDate('前天'), run(getRelativeDate(null, null, -2), 'reset'), 'day before yesterday');
    equal(testCreateDate('大前天'), run(getRelativeDate(null, null, -3), 'reset'), 'day before day before yesterday');
    equal(testCreateDate('昨天'), run(getRelativeDate(null, null, -1), 'reset'), 'yesterday');
    equal(testCreateDate('今天'), run(getRelativeDate(null, null, 0), 'reset'), 'today');
    equal(testCreateDate('明天'), run(getRelativeDate(null, null, 1), 'reset'), 'tomorrow');
    equal(testCreateDate('后天'), run(getRelativeDate(null, null, 2), 'reset'), 'day after tomorrow');
    equal(testCreateDate('大后天'), run(getRelativeDate(null, null, 3), 'reset'), 'day after day after tomorrow');

    equal(testCreateDate('上周'), getRelativeDate(null, null, -7), 'Last week');
    equal(testCreateDate('这周'), getRelativeDate(null, null, 0),  'This week');
    equal(testCreateDate('下周'), getRelativeDate(null, null, 7),  'Next week');

    equal(testCreateDate('上个月'), getRelativeDate(null, -1), 'last month');
    equal(testCreateDate('这个月'), getRelativeDate(null, 0), 'this month');
    equal(testCreateDate('下个月'), getRelativeDate(null, 1), 'Next month');

    equal(testCreateDate('去年'), getRelativeDate(-1), 'Last year');
    equal(testCreateDate('明年'), getRelativeDate(1), 'Next year');

    equal(testCreateDate('上周三'), getDateWithWeekdayAndOffset(3, -7), 'Last wednesday');
    equal(testCreateDate('这周六'), getDateWithWeekdayAndOffset(6), 'this Saturday');
    equal(testCreateDate('下周五'), getDateWithWeekdayAndOffset(5, 7), 'Next friday');

    equal(testCreateDate('2011年5月15日 下午3:45'), new Date(2011, 4, 15, 15, 45), 'pm still works');

    equal(testCreateDate('2011年5月15日 3:45:59'), new Date(2011, 4, 15, 3, 45, 59), 'full date with time');
    equal(testCreateDate('2011年5月15日 3点45分'), new Date(2011, 4, 15, 3, 45, 0), 'full date with kanji markers');

    equal(testCreateDate('二〇〇八年十一月十四日 三点四十五分'), new Date(2008, 10, 14, 3, 45), 'full date with full kanji');
    equal(testCreateDate('二〇〇八年十一月十四日 三点四十五分钟'), new Date(2008, 10, 14, 3, 45), 'full date with full kanji and zhong');

    equal(testCreateDate('二〇〇八年十一月十四日 三点四十五分钟'), new Date(2008, 10, 14, 3, 45), 'full date with full kanji and zhong');

    equal(testCreateDate('18:00', 'zh-CN').getHours(), 18, 'hour:minute only');

  });

  method('format', function() {

    test(then, '2010年1月5日下午3点52分', 'default format');

    assertFormatShortcut(then, 'short', '2010-01-05');
    assertFormatShortcut(then, 'medium', '2010年1月5日');
    assertFormatShortcut(then, 'long', '2010年1月5日下午3点52分');
    assertFormatShortcut(then, 'full', '2010年1月5日星期二下午3点52分');
    test(then, ['{time}'], '下午3点52分', 'preferred time');
    test(then, ['{stamp}'], '2010年1月5日15:52二', 'preferred stamp');
    test(then, ['%c'], '2010年1月5日15:52二', '%c stamp');

    test(new Date('January 3, 2010'), ['{w}'], '53', 'locale week number | Jan 3 2010');
    test(new Date('January 3, 2010'), ['{ww}'], '53', 'locale week number padded | Jan 3 2010');
    test(new Date('January 3, 2010'), ['{wo}'], '53rd', 'locale week number ordinal | Jan 3 2010');
    test(new Date('January 4, 2010'), ['{w}'], '1', 'locale week number | Jan 4 2010');
    test(new Date('January 4, 2010'), ['{ww}'], '01', 'locale week number padded | Jan 4 2010');
    test(new Date('January 4, 2010'), ['{wo}'], '1st', 'locale week number ordinal | Jan 4 2010');

    test(new Date(2015, 10, 8),  ['{Dow}'], '日', 'Sun');
    test(new Date(2015, 10, 9),  ['{Dow}'], '一', 'Mon');
    test(new Date(2015, 10, 10), ['{Dow}'], '二', 'Tue');
    test(new Date(2015, 10, 11), ['{Dow}'], '三', 'Wed');
    test(new Date(2015, 10, 12), ['{Dow}'], '四', 'Thu');
    test(new Date(2015, 10, 13), ['{Dow}'], '五', 'Fri');
    test(new Date(2015, 10, 14), ['{Dow}'], '六', 'Sat');

    test(new Date(2015, 0, 1),  ['{Mon}'], '1月', 'Jan');
    test(new Date(2015, 1, 1),  ['{Mon}'], '2月', 'Feb');
    test(new Date(2015, 2, 1),  ['{Mon}'], '3月', 'Mar');
    test(new Date(2015, 3, 1),  ['{Mon}'], '4月', 'Apr');
    test(new Date(2015, 4, 1),  ['{Mon}'], '5月', 'May');
    test(new Date(2015, 5, 1),  ['{Mon}'], '6月', 'Jun');
    test(new Date(2015, 6, 1),  ['{Mon}'], '7月', 'Jul');
    test(new Date(2015, 7, 1),  ['{Mon}'], '8月', 'Aug');
    test(new Date(2015, 8, 1),  ['{Mon}'], '9月', 'Sep');
    test(new Date(2015, 9, 1),  ['{Mon}'], '10月', 'Oct');
    test(new Date(2015, 10, 1), ['{Mon}'], '11月', 'Nov');
    test(new Date(2015, 11, 1), ['{Mon}'], '12月', 'Dec');

  });

  method('relative', function() {
    assertRelative('1 second ago', '1秒钟前');
    assertRelative('1 minute ago', '1分钟前');
    assertRelative('1 hour ago',   '1小时前');
    assertRelative('1 day ago',    '1天前');
    assertRelative('1 week ago',   '1个星期前');
    assertRelative('1 month ago',  '1个月前');
    assertRelative('1 year ago',   '1年前');

    assertRelative('2 seconds ago', '2秒钟前');
    assertRelative('2 minutes ago', '2分钟前');
    assertRelative('2 hours ago',   '2小时前');
    assertRelative('2 days ago',    '2天前');
    assertRelative('2 weeks ago',   '2个星期前');
    assertRelative('2 months ago',  '2个月前');
    assertRelative('2 years ago',   '2年前');

    assertRelative('1 second from now', '1秒钟后');
    assertRelative('1 minute from now', '1分钟后');
    assertRelative('1 hour from now',   '1小时后');
    assertRelative('1 day from now',    '1天后');
    assertRelative('1 week from now',   '1个星期后');
    assertRelative('1 year from now',   '1年后');

    assertRelative('5 seconds from now', '5秒钟后');
    assertRelative('5 minutes from now', '5分钟后');
    assertRelative('5 hours from now',   '5小时后');
    assertRelative('5 days from now',    '5天后');
    assertRelative('5 weeks from now',   '1个月后');
    assertRelative('5 years from now',   '5年后');
  });


  group('Hanzi', function() {
    equal(testCreateDate('二〇一二年五月'), new Date(2012, 4), '二〇一二年五月');
    equal(testCreateDate('二〇一二年'), new Date(2012, 0), '二〇一二年');
    equal(testCreateDate('五月'), new Date(now.getFullYear(), 4), '五月');
    equal(testCreateDate('十二月'), new Date(now.getFullYear(), 11), '十二月');
    equal(testCreateDate('十一月'), new Date(now.getFullYear(), 10), '十一月');
    equal(testCreateDate('十月'), new Date(now.getFullYear(), 9), '十月');
    equal(testCreateDate('二〇一二年'), new Date(2012, 0), '二〇一二年');

    equal(testCreateDate('二千二百二十二年'), new Date(2222, 0), '二千二百二十二年');
    equal(testCreateDate('二千二十二年'), new Date(2022, 0), '二千二十二年');
    equal(testCreateDate('二千二年'), new Date(2002, 0), '二千二年');
    equal(testCreateDate('二千年'), new Date(2000, 0), '二千年');
    equal(testCreateDate('千年'), new Date(1000, 0), '千年');

    equal(testCreateDate('二千二百二十年'), new Date(2220, 0), '二千二百二十年');
    equal(testCreateDate('二千二百年'), new Date(2200, 0), '二千二百年');
    equal(testCreateDate('二千二年'), new Date(2002, 0), '二千二年');

    equal(testCreateDate('千二百二十二年'), new Date(1222, 0), '千二百二十二年');
    equal(testCreateDate('千二百二十二年'), new Date(1222, 0), '千二百二十二年');
    equal(testCreateDate('千百二十二年'), new Date(1122, 0), '千百二十二年');
    equal(testCreateDate('千二十二年'), new Date(1022, 0), '千二十二年');
    equal(testCreateDate('千十二年'), new Date(1012, 0), '千十二年');

    equal(testCreateDate('二〇二一年'), new Date(2021, 0), '二〇二一年');
    equal(testCreateDate('二三二一年'), new Date(2321, 0), '二三二一年');
    equal(testCreateDate('四三二一年'), new Date(4321, 0), '四三二一年');

    // Issue #148 various Chinese dates

    equal(testCreateDate('星期日 下午2:00'), run(getDateWithWeekdayAndOffset(0), 'set', [{ hour: 14 }]), '星期日 2:00pm');
    equal(testCreateDate('下星期六 3点12分'), getDateWithWeekdayAndOffset(6, 7, 3, 12), 'Saturday 3:12');

    equal(testCreateDate('上午3点12分'), run(new Date(), 'set', [{ hour: 3, minute: 12 }, true]), '3:12am');
    equal(testCreateDate('上午3点'), run(new Date(), 'set', [{ hour: 3 }, true]), '3am');

    equal(testCreateDate('上午3时12分'), run(new Date(), 'set', [{ hour: 3, minute: 12 }, true]), '时 | 3:12am');
    equal(testCreateDate('上午3时'), run(new Date(), 'set', [{ hour: 3 }, true]), '时 | 3am');

  });

  method('beginning/end', function() {
    equal(dateRun(new Date(2010, 0), 'beginningOfWeek'), new Date(2009, 11, 28), 'beginningOfWeek');
    equal(dateRun(new Date(2010, 0), 'endOfWeek'), new Date(2010, 0, 3, 23, 59, 59, 999), 'endOfWeek');
  });

});

namespace('Number | Simplified Chinese', function () {

  method('duration', function() {
    test(run(5, 'hours'), ['zh-CN'], '5小时', 'simple duration');
  });

});

